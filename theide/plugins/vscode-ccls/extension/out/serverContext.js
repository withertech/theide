"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerContext = void 0;
const cp = require("child_process");
const vscode_1 = require("vscode");
const vscode_languageclient_1 = require("vscode-languageclient");
const WebSocket = require("ws");
const cclsErrorHandler_1 = require("./cclsErrorHandler");
const globalContext_1 = require("./globalContext");
const callHierarchy_1 = require("./hierarchies/callHierarchy");
const inheritanceHierarchy_1 = require("./hierarchies/inheritanceHierarchy");
const memberHierarchy_1 = require("./hierarchies/memberHierarchy");
const inactiveRegions_1 = require("./inactiveRegions");
const semantic_1 = require("./semantic");
const statusBarIcon_1 = require("./statusBarIcon");
const utils_1 = require("./utils");
const vscodeUtils_1 = require("./vscodeUtils");
function flatObjectImpl(obj, pref, result) {
    if (typeof obj === "object") {
        for (const key of Object.keys(obj)) {
            const val = obj[key];
            const newpref = `${pref}.${key}`;
            if (typeof val === "object" || val instanceof Array) {
                flatObjectImpl(val, newpref, result);
            }
            else {
                result.set(newpref, `${val}`);
            }
        }
    }
    else if (obj instanceof Array) {
        let idx = 0;
        for (const val of obj) {
            const newpref = `${pref}.${idx}`;
            if (typeof val === "object" || val instanceof Array) {
                flatObjectImpl(val, newpref, result);
            }
            else {
                result.set(newpref, `${val}`);
            }
            idx++;
        }
    }
}
function flatObject(obj, pref = "") {
    const result = new Map();
    flatObjectImpl(obj, pref, result);
    return result;
}
function getClientConfig(wsRoot) {
    function hasAnySemanticHighlight() {
        const config = vscode_1.workspace.getConfiguration('ccls');
        for (const kind of semantic_1.semanticKinds) {
            const face = config.get(`highlight.${kind}.face`, []);
            if (face.length > 0)
                return true;
        }
        return false;
    }
    function resolveVariablesInString(value) {
        return value.replace('${workspaceFolder}', wsRoot);
    }
    function resloveVariablesInArray(value) {
        return value.map((v) => resolveVariables(v));
    }
    function resolveVariables(value) {
        if (typeof (value) === 'string') {
            return resolveVariablesInString(value);
        }
        if (Array.isArray(value)) {
            return resloveVariablesInArray(value);
        }
        return value;
    }
    function setConfig(config, dottedName, value) {
        if (value != null) {
            const subprops = dottedName.split('.');
            let subconfig = config;
            for (const subprop of subprops.slice(0, subprops.length - 1)) {
                if (!subconfig.hasOwnProperty(subprop)) {
                    subconfig[subprop] = {};
                }
                subconfig = subconfig[subprop];
            }
            subconfig[subprops[subprops.length - 1]] = resolveVariables(value);
        }
    }
    function setClientConfigFromWorkspaceConfig(cliConfig, workspaceConfig, mapping, blacklist) {
        function recurse(config, parentPath = '') {
            for (const key of Object.keys(config)) {
                const value = config[key];
                const currentPath = (parentPath ? parentPath + '.' : '') + key;
                if (blacklist.has(currentPath) || typeof value === 'function') {
                    continue;
                }
                if (typeof value === 'object' && value !== null && !(value instanceof Array)) {
                    recurse(value, currentPath);
                }
                else {
                    setConfig(cliConfig, mapping.get(currentPath) || currentPath, value);
                }
            }
        }
        recurse(workspaceConfig);
    }
    // Read prefs; this map goes from `vscode prefs name` => `ccls/js name`.
    // For flags which have different name between vscode-ccls prefs and
    // ClientConfig / ccls initializationOption
    const configMapping = new Map([
        ['launch.command', 'launchCommand'],
        ['launch.args', 'launchArgs'],
        ['misc.compilationDatabaseCommand', 'compilationDatabaseCommand'],
        ['misc.compilationDatabaseDirectory', 'compilationDatabaseDirectory'],
        ['completion.enableSnippetInsertion', 'client.snippetSupport'],
        ['callHierarchy.qualified', 'callHiearchyQualified'],
    ]);
    // For flags which should not be populated in ClientConfig (used only by other parts of vscode-ccls)
    // It seems like ccls happily ignores extra keys in initializationOption so this is not required.
    const configBlacklist = new Set([
        'codeLens.enabled',
        'codeLens.renderInline',
        'highlight',
        'misc.showInactiveRegions',
        'theme',
        'trace',
        'treeViews',
    ]);
    const clientConfig = {
        callHiearchyQualified: false,
        highlight: {
            blacklist: hasAnySemanticHighlight() ? [] : ['.*'],
            lsRanges: true,
        },
        launchArgs: [],
        launchCommand: '',
        statusUpdateInterval: 0,
        traceEndpoint: '',
    };
    setClientConfigFromWorkspaceConfig(clientConfig, vscode_1.workspace.getConfiguration('ccls'), configMapping, configBlacklist);
    return clientConfig;
}
/** instance represents running instance of ccls */
class ServerContext {
    constructor(cwd, lazyMode = false) {
        this.cwd = cwd;
        this.ignoredConf = new Array();
        this._dispose = [];
        this.lastGoto = {
            clockTime: 0,
            id: undefined,
        };
        this.cliConfig = getClientConfig(cwd);
        if (lazyMode) {
            this.ignoredConf.push(".index.initialBlacklist");
            this.cliConfig.index.initialBlacklist = [".*"];
        }
        vscode_1.workspace.onDidChangeConfiguration(this.onDidChangeConfiguration, this, this._dispose);
        this.client = this.initClient();
        this.p2c = this.client.protocol2CodeConverter;
    }
    dispose() {
        return utils_1.disposeAll(this._dispose);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this._dispose.push(this.client.start());
            try {
                yield this.client.onReady();
            }
            catch (e) {
                vscode_1.window.showErrorMessage(`Failed to start ccls with command "${this.cliConfig.launchCommand}".`);
            }
            // General commands.
            this._dispose.push(vscode_1.commands.registerCommand("ccls.vars", this.makeRefHandler("$ccls/vars")));
            this._dispose.push(vscode_1.commands.registerCommand("ccls.call", this.makeRefHandler("$ccls/call")));
            this._dispose.push(vscode_1.commands.registerCommand("ccls.member", this.makeRefHandler("$ccls/member")));
            this._dispose.push(vscode_1.commands.registerCommand("ccls.base", this.makeRefHandler("$ccls/inheritance", { derived: false }, true)));
            this._dispose.push(vscode_1.commands.registerCommand("ccls.showXrefs", this.showXrefsHandlerCmd, this));
            // The language client does not correctly deserialize arguments, so we have a
            // wrapper command that does it for us.
            this._dispose.push(vscode_1.commands.registerCommand('ccls.showReferences', this.showReferencesCmd, this));
            this._dispose.push(vscode_1.commands.registerCommand('ccls.goto', this.gotoCmd, this));
            this._dispose.push(vscode_1.commands.registerCommand("ccls._applyFixIt", this.fixItCmd, this));
            this._dispose.push(vscode_1.commands.registerCommand('ccls._autoImplement', this.autoImplementCmd, this));
            this._dispose.push(vscode_1.commands.registerCommand('ccls._insertInclude', this.insertIncludeCmd, this));
            const config = vscode_1.workspace.getConfiguration('ccls');
            if (config.get('misc.showInactiveRegions')) {
                const inact = new inactiveRegions_1.InactiveRegionsProvider(this.client);
                this._dispose.push(inact);
            }
            const inheritanceHierarchyProvider = new inheritanceHierarchy_1.InheritanceHierarchyProvider(this.client);
            this._dispose.push(inheritanceHierarchyProvider);
            this._dispose.push(vscode_1.window.registerTreeDataProvider("ccls.inheritanceHierarchy", inheritanceHierarchyProvider));
            const callHiearchyQualified = this.cliConfig.callHiearchyQualified;
            const callHierarchyProvider = new callHierarchy_1.CallHierarchyProvider(this.client, callHiearchyQualified);
            this._dispose.push(callHierarchyProvider);
            this._dispose.push(vscode_1.window.registerTreeDataProvider('ccls.callHierarchy', callHierarchyProvider));
            const memberHierarchyProvider = new memberHierarchy_1.MemberHierarchyProvider(this.client);
            this._dispose.push(memberHierarchyProvider);
            this._dispose.push(vscode_1.window.registerTreeDataProvider('ccls.memberHierarchy', memberHierarchyProvider));
            // Common between tree views.
            this._dispose.push(vscode_1.commands.registerCommand("ccls.gotoForTreeView", this.gotoForTreeView, this));
            this._dispose.push(vscode_1.commands.registerCommand("ccls.hackGotoForTreeView", this.hackGotoForTreeView, this));
            // Semantic highlight
            const semantic = new semantic_1.SemanticContext();
            this._dispose.push(semantic);
            this.client.onNotification('$ccls/publishSemanticHighlight', (args) => semantic.publishSemanticHighlight(args));
            this._dispose.push(vscode_1.commands.registerCommand('ccls.navigate', this.makeNavigateHandler('$ccls/navigate')));
            const interval = this.cliConfig.statusUpdateInterval;
            if (interval) {
                const statusBarIconProvider = new statusBarIcon_1.StatusBarIconProvider(this.client, interval);
                this._dispose.push(statusBarIconProvider);
            }
            this._dispose.push(vscode_1.commands.registerCommand("ccls.reload", this.reloadIndex, this));
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            const pid = utils_1.unwrap(this.clientPid);
            const serverResponds = yield Promise.race([
                (() => __awaiter(this, void 0, void 0, function* () { yield utils_1.wait(300); return false; }))(),
                (() => __awaiter(this, void 0, void 0, function* () { yield this.client.stop(); return true; }))()
            ]);
            // waitpid was called in client.stop
            if (!serverResponds) {
                console.info('Server does not repsond, killing');
                try {
                    process.kill(pid, 'SIGTERM');
                }
                catch (e) {
                    console.info('Kill failed: ' + e.message);
                }
            }
            this.clientPid = undefined;
        });
    }
    reloadIndex() {
        this.client.sendNotification('$ccls/reload', { blacklist: [], dependencies: true, whilelist: [] });
    }
    onDidChangeConfiguration() {
        return __awaiter(this, void 0, void 0, function* () {
            const newConfig = getClientConfig(this.cwd);
            const newflat = flatObject(newConfig);
            const oldflat = flatObject(this.cliConfig);
            for (const [key, newVal] of newflat) {
                const oldVal = oldflat.get(key);
                if (newVal === undefined || this.ignoredConf.some((e) => key.startsWith(e))) {
                    continue;
                }
                if (oldVal !== newVal) {
                    const kRestart = 'Restart';
                    const message = `Please restart server to apply the "ccls${key}" configuration change.`;
                    const selected = yield vscode_1.window.showInformationMessage(message, kRestart);
                    if (selected === kRestart)
                        vscode_1.commands.executeCommand('ccls.restart');
                    break;
                }
            }
        });
    }
    provideCodeLens(document, token, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = vscode_1.workspace.getConfiguration('ccls');
            const enableCodeLens = config.get('codeLens.enabled');
            if (!enableCodeLens)
                return [];
            const enableInlineCodeLens = config.get('codeLens.renderInline', false);
            if (!enableInlineCodeLens) {
                const uri = document.uri;
                const position = document.positionAt(0);
                const lensesObjs = yield this.client.sendRequest('textDocument/codeLens', {
                    position,
                    textDocument: {
                        uri: uri.toString(true),
                    },
                });
                const lenses = this.p2c.asCodeLenses(lensesObjs);
                return lenses.map((lense) => {
                    const cmd = lense.command;
                    if (cmd && cmd.command === 'ccls.xref') {
                        // Change to a custom command which will fetch and then show the results
                        cmd.command = 'ccls.showXrefs';
                        cmd.arguments = [
                            uri,
                            lense.range.start,
                            cmd.arguments,
                        ];
                    }
                    return this.p2c.asCodeLens(lense);
                });
            }
            // We run the codeLens request ourselves so we can intercept the response.
            const a = yield this.client.sendRequest('textDocument/codeLens', {
                textDocument: {
                    uri: document.uri.toString(true),
                },
            });
            const result = this.p2c.asCodeLenses(a);
            this.displayCodeLens(document, result);
            return [];
        });
    }
    displayCodeLens(document, allCodeLens) {
        const decorationOpts = {
            after: {
                color: new vscode_1.ThemeColor('editorCodeLens.foreground'),
                fontStyle: 'italic',
            },
            rangeBehavior: vscode_1.DecorationRangeBehavior.ClosedClosed,
        };
        const codeLensDecoration = vscode_1.window.createTextEditorDecorationType(decorationOpts);
        for (const editor of vscode_1.window.visibleTextEditors) {
            if (editor.document !== document)
                continue;
            const opts = [];
            for (const codeLens of allCodeLens) {
                // FIXME: show a real warning or disable on-the-side code lens.
                if (!codeLens.isResolved)
                    console.error('Code lens is not resolved');
                // Default to after the content.
                let position = codeLens.range.end;
                // If multiline push to the end of the first line - works better for
                // functions.
                if (codeLens.range.start.line !== codeLens.range.end.line)
                    position = new vscode_1.Position(codeLens.range.start.line, 1000000);
                const range = new vscode_1.Range(position, position);
                const opt = {
                    range,
                    renderOptions: { after: { contentText: ' ' + utils_1.unwrap(codeLens.command, "lens").title + ' ' } }
                };
                opts.push(opt);
            }
            editor.setDecorations(codeLensDecoration, opts);
        }
    }
    initClient() {
        const args = this.cliConfig.launchArgs;
        const serverOptions = () => __awaiter(this, void 0, void 0, function* () {
            const child = cp.spawn(this.cliConfig.launchCommand, args);
            this.clientPid = child.pid;
            return child;
        });
        const config = vscode_1.workspace.getConfiguration('ccls');
        // Options to control the language client
        const clientOptions = {
            diagnosticCollectionName: 'ccls',
            documentSelector: ['c', 'cpp', 'objective-c', 'objective-cpp'],
            // synchronize: {
            // 	configurationSection: 'ccls',
            // 	fileEvents: workspace.createFileSystemWatcher('**/.cc')
            // },
            errorHandler: new cclsErrorHandler_1.CclsErrorHandler(config),
            initializationFailedHandler: (e) => {
                console.log(e);
                return false;
            },
            initializationOptions: this.cliConfig,
            middleware: { provideCodeLenses: (doc, next, token) => this.provideCodeLens(doc, next, token) },
            outputChannel: globalContext_1.cclsChan,
            revealOutputChannelOn: vscode_languageclient_1.RevealOutputChannelOn.Never,
        };
        const traceEndpoint = config.get('trace.websocketEndpointUrl');
        if (traceEndpoint) {
            const socket = new WebSocket(traceEndpoint);
            let log = '';
            clientOptions.outputChannel = {
                name: 'websocket',
                append(value) {
                    log += value;
                },
                appendLine(value) {
                    log += value;
                    if (socket && socket.readyState === WebSocket.OPEN) {
                        socket.send(log);
                    }
                    log = '';
                },
                clear() { },
                show() { },
                hide() { },
                dispose() { socket.close(); }
            };
        }
        // Create the language client and start the client.
        return new vscode_languageclient_1.LanguageClient('ccls', 'ccls', serverOptions, clientOptions);
    }
    makeRefHandler(methodName, extraParams = {}, autoGotoIfSingle = false) {
        return (userParams) => __awaiter(this, void 0, void 0, function* () {
            /*
            userParams: a dict defined as `args` in keybindings.json (or passed by other extensions like VSCodeVIM)
            Values defined by user have higher priority than `extraParams`
            */
            const editor = utils_1.unwrap(vscode_1.window.activeTextEditor, "window.activeTextEditor");
            const position = editor.selection.active;
            const uri = editor.document.uri;
            const locations = yield this.client.sendRequest(methodName, Object.assign(Object.assign({ position, textDocument: {
                    uri: uri.toString(true),
                } }, extraParams), userParams));
            if (autoGotoIfSingle && locations.length === 1) {
                const location = this.p2c.asLocation(locations[0]);
                vscode_1.commands.executeCommand('ccls.goto', location.uri, location.range.start, []);
            }
            else {
                vscode_1.commands.executeCommand('editor.action.showReferences', uri, position, locations.map(this.p2c.asLocation));
            }
        });
    }
    showXrefsHandlerCmd(uri, position, xrefArgs) {
        return __awaiter(this, void 0, void 0, function* () {
            const locations = yield vscode_1.commands.executeCommand('ccls.xref', ...xrefArgs);
            if (!locations)
                return;
            vscode_1.commands.executeCommand('editor.action.showReferences', uri, this.p2c.asPosition(position), locations.map(this.p2c.asLocation));
        });
    }
    showReferencesCmd(uri, position, locations) {
        vscode_1.commands.executeCommand('editor.action.showReferences', this.p2c.asUri(uri), this.p2c.asPosition(position), locations.map(this.p2c.asLocation));
    }
    gotoCmd(uri, position, locations) {
        return __awaiter(this, void 0, void 0, function* () {
            return vscodeUtils_1.jumpToUriAtPosition(this.p2c.asUri(uri), this.p2c.asPosition(position), false /*preserveFocus*/);
        });
    }
    fixItCmd(uri, pTextEdits) {
        return __awaiter(this, void 0, void 0, function* () {
            const textEdits = this.p2c.asTextEdits(pTextEdits);
            function applyEdits(editor) {
                return __awaiter(this, void 0, void 0, function* () {
                    const success = yield editor.edit((editBuilder) => {
                        for (const edit of textEdits) {
                            editBuilder.replace(edit.range, edit.newText);
                        }
                    });
                    if (!success) {
                        vscode_1.window.showErrorMessage("Failed to apply FixIt");
                    }
                });
            }
            // Find existing open document.
            for (const textEditor of vscode_1.window.visibleTextEditors) {
                if (textEditor.document.uri.toString(true) === utils_1.normalizeUri(uri)) {
                    applyEdits(textEditor);
                    return;
                }
            }
            // Failed, open new document.
            const d = yield vscode_1.workspace.openTextDocument(vscode_1.Uri.parse(uri));
            const e = yield vscode_1.window.showTextDocument(d);
            if (!e) { // FIXME seems to be redundant
                vscode_1.window.showErrorMessage("Failed to to get editor for FixIt");
            }
            applyEdits(e);
        });
    }
    autoImplementCmd(uri, pTextEdits) {
        return __awaiter(this, void 0, void 0, function* () {
            yield vscode_1.commands.executeCommand('ccls._applyFixIt', uri, pTextEdits);
            vscode_1.commands.executeCommand('ccls.goto', uri, pTextEdits[0].range.start);
        });
    }
    insertIncludeCmd(uri, pTextEdits) {
        return __awaiter(this, void 0, void 0, function* () {
            if (pTextEdits.length === 1)
                vscode_1.commands.executeCommand('ccls._applyFixIt', uri, pTextEdits);
            else {
                class MyQuickPick {
                    constructor(label, description, edit) {
                        this.label = label;
                        this.description = description;
                        this.edit = edit;
                    }
                }
                const items = [];
                for (const edit of pTextEdits) {
                    items.push(new MyQuickPick(edit.newText, '', edit));
                }
                const selected = yield vscode_1.window.showQuickPick(items);
                if (!selected)
                    return;
                vscode_1.commands.executeCommand('ccls._applyFixIt', uri, [selected.edit]);
            }
        });
    }
    gotoForTreeView(node) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!node.location)
                return;
            const parsedUri = vscode_1.Uri.parse(node.location.uri);
            const parsedPosition = this.p2c.asPosition(node.location.range.start);
            return vscodeUtils_1.jumpToUriAtPosition(parsedUri, parsedPosition, true /*preserveFocus*/);
        });
    }
    hackGotoForTreeView(node, hasChildren) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!node.location)
                return;
            if (!hasChildren) {
                vscode_1.commands.executeCommand('ccls.gotoForTreeView', node);
                return;
            }
            if (this.lastGoto.id !== node.id) {
                this.lastGoto.id = node.id;
                this.lastGoto.clockTime = Date.now();
                return;
            }
            const config = vscode_1.workspace.getConfiguration('ccls');
            const kDoubleClickTimeMs = config.get('treeViews.doubleClickTimeoutMs', 500);
            const elapsed = Date.now() - this.lastGoto.clockTime;
            this.lastGoto.clockTime = Date.now();
            if (elapsed < kDoubleClickTimeMs)
                vscode_1.commands.executeCommand('ccls.gotoForTreeView', node);
        });
    }
    makeNavigateHandler(methodName) {
        return (userParams) => __awaiter(this, void 0, void 0, function* () {
            const editor = utils_1.unwrap(vscode_1.window.activeTextEditor, "window.activeTextEditor");
            const position = editor.selection.active;
            const uri = editor.document.uri;
            const locations = yield this.client.sendRequest(methodName, Object.assign({ position, textDocument: {
                    uri: uri.toString(true),
                } }, userParams));
            if (locations.length === 1) {
                const location = this.p2c.asLocation(locations[0]);
                yield vscodeUtils_1.jumpToUriAtPosition(location.uri, location.range.start, false /*preserveFocus*/);
            }
        });
    }
}
exports.ServerContext = ServerContext;
//# sourceMappingURL=serverContext.js.map