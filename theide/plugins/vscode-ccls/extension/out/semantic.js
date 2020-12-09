"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemanticContext = exports.semanticKinds = void 0;
const vscode_1 = require("vscode");
const vscode_languageserver_types_1 = require("vscode-languageserver-types");
const utils_1 = require("./utils");
var CclsSymbolKind;
(function (CclsSymbolKind) {
    // ls.SymbolKind ccls extensions
    CclsSymbolKind[CclsSymbolKind["TypeAlias"] = 252] = "TypeAlias";
    CclsSymbolKind[CclsSymbolKind["Parameter"] = 253] = "Parameter";
    CclsSymbolKind[CclsSymbolKind["StaticMethod"] = 254] = "StaticMethod";
    CclsSymbolKind[CclsSymbolKind["Macro"] = 255] = "Macro";
})(CclsSymbolKind || (CclsSymbolKind = {}));
var StorageClass;
(function (StorageClass) {
    StorageClass[StorageClass["None"] = 0] = "None";
    StorageClass[StorageClass["Extern"] = 1] = "Extern";
    StorageClass[StorageClass["Static"] = 2] = "Static";
    StorageClass[StorageClass["PrivateExtern"] = 3] = "PrivateExtern";
    StorageClass[StorageClass["Auto"] = 4] = "Auto";
    StorageClass[StorageClass["Register"] = 5] = "Register";
})(StorageClass || (StorageClass = {}));
exports.semanticKinds = [
    'function',
    'variable',
    'type',
    'enum',
    'globalVariable',
    'macro',
    'memberFunction',
    'memberVariable',
    'namespace',
    'parameter',
    'staticMemberFunction',
    'staticMemberVariable',
    'staticVariable',
    'typeAlias',
];
// TODO: enable bold/italic decorators, might need change in vscode
class SemanticContext {
    constructor() {
        this.semanticDecorations = new Map();
        this.semanticEnabled = new Map();
        this.cachedDecorations = new Map();
        this._dispose = [];
        this.updateConfigValues();
        vscode_1.window.onDidChangeActiveTextEditor((editor) => {
            if (editor) {
                this.updateDecoration(editor);
            }
        }, undefined, this._dispose);
    }
    dispose() {
        utils_1.disposeAll(this._dispose);
    }
    publishSemanticHighlight(args) {
        const normUri = utils_1.normalizeUri(args.uri);
        for (const visibleEditor of vscode_1.window.visibleTextEditors) {
            if (normUri !== visibleEditor.document.uri.toString(true))
                continue;
            const decorations = new Map();
            for (const symbol of args.symbols) {
                const type = this.tryFindDecoration(symbol);
                if (!type)
                    continue;
                const existing = decorations.get(type);
                if (existing) {
                    for (const range of symbol.lsRanges) {
                        existing.push(range);
                    }
                }
                else {
                    decorations.set(type, symbol.lsRanges);
                }
            }
            // TODO limit cache size
            this.cachedDecorations.set(normUri, decorations);
            this.updateDecoration(visibleEditor);
        }
    }
    updateConfigValues() {
        const config = vscode_1.workspace.getConfiguration('ccls');
        for (const kind of exports.semanticKinds) {
            const props = [];
            const face = config.get(`highlight.${kind}.face`, []);
            let colors = config.get(`highlight.${kind}.colors`, []);
            let enabled = false;
            const stack = [[face, 0]];
            const visited = new Set([kind]);
            while (stack.length > 0) {
                const top = stack[stack.length - 1];
                if (top[1] >= top[0].length) {
                    stack.pop();
                    continue;
                }
                const f = top[0][top[1]++];
                if (f === 'enabled')
                    enabled = true;
                else if (f.indexOf(':') >= 0)
                    props.push(f.split(':'));
                else {
                    if (visited.has(f))
                        continue;
                    visited.add(f);
                    if (colors.length === 0)
                        colors = config.get(`highlight.${f}.colors`, []);
                    const face1 = config.get(`highlight.${f}.face`);
                    if (face1 instanceof Array)
                        stack.push([face1, 0]);
                }
            }
            this.semanticEnabled.set(kind, enabled);
            if (colors.length === 0)
                colors = [undefined];
            this.semanticDecorations.set(kind, colors.map((color) => {
                const opt = {};
                opt.rangeBehavior = vscode_1.DecorationRangeBehavior.ClosedClosed;
                opt.color = color;
                for (const prop of props)
                    opt[prop[0]] = prop[1].trim();
                return vscode_1.window.createTextEditorDecorationType(opt);
            }));
        }
    }
    tryFindDecoration(symbol) {
        const get = (name) => {
            if (!this.semanticEnabled.get(name))
                return undefined;
            const decorations = utils_1.unwrap(this.semanticDecorations.get(name), "semantic");
            return decorations[symbol.id % decorations.length];
        };
        switch (symbol.kind) {
            // Functions
            case vscode_languageserver_types_1.SymbolKind.Method:
            case vscode_languageserver_types_1.SymbolKind.Constructor:
                return get('memberFunction');
            case vscode_languageserver_types_1.SymbolKind.Function:
                return get('function');
            case CclsSymbolKind.StaticMethod:
                return get('staticMemberFunction');
            // Types
            case vscode_languageserver_types_1.SymbolKind.Namespace:
                return get('namespace');
            case vscode_languageserver_types_1.SymbolKind.Class:
            case vscode_languageserver_types_1.SymbolKind.Struct:
            case vscode_languageserver_types_1.SymbolKind.Enum:
            case vscode_languageserver_types_1.SymbolKind.TypeParameter:
                return get('type');
            case CclsSymbolKind.TypeAlias:
                return get('typeAlias');
            // Variables
            case vscode_languageserver_types_1.SymbolKind.Field:
                if (symbol.storage === StorageClass.Static)
                    return get('staticMemberVariable');
                return get('memberVariable');
            case vscode_languageserver_types_1.SymbolKind.Variable:
                if (symbol.storage === StorageClass.Static)
                    return get('staticVariable');
                if (symbol.parentKind === vscode_languageserver_types_1.SymbolKind.File ||
                    symbol.parentKind === vscode_languageserver_types_1.SymbolKind.Namespace)
                    return get('globalVariable');
                return get('variable');
            case vscode_languageserver_types_1.SymbolKind.EnumMember:
                return get('enum');
            case CclsSymbolKind.Parameter:
                return get('parameter');
            case CclsSymbolKind.Macro:
                return get('macro');
        }
    }
    updateDecoration(editor) {
        const uri = editor.document.uri.toString(true);
        const cachedDecoration = this.cachedDecorations.get(uri);
        if (cachedDecoration) {
            // Clear decorations and set new ones. We might not use all of the
            // decorations so clear before setting.
            for (const [_, decorations] of this.semanticDecorations) {
                decorations.forEach((type) => {
                    editor.setDecorations(type, []);
                });
            }
            // Set new decorations.
            cachedDecoration.forEach((ranges, type) => {
                editor.setDecorations(type, ranges);
            });
        }
    }
}
exports.SemanticContext = SemanticContext;
//# sourceMappingURL=semantic.js.map