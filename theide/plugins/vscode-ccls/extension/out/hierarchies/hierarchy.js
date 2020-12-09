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
exports.Hierarchy = void 0;
const path = require("path");
const vscode_1 = require("vscode");
const utils_1 = require("../utils");
function nodeIsIncomplete(node) {
    return node.children.length !== node.numChildren;
}
class Hierarchy {
    constructor(languageClient, revealCmdName, closeCmdName) {
        this.languageClient = languageClient;
        this._dispose = [];
        this.onDidChangeEmitter = new vscode_1.EventEmitter();
        // tslint:disable-next-line:member-ordering
        this.onDidChangeTreeData = this.onDidChangeEmitter.event;
        this._dispose.push(vscode_1.commands.registerTextEditorCommand(revealCmdName, this.reveal, this));
        this._dispose.push(vscode_1.commands.registerCommand(closeCmdName, this.close, this));
    }
    dispose() {
        utils_1.disposeAll(this._dispose);
    }
    getTreeItem(element) {
        const ti = new vscode_1.TreeItem(element.name);
        ti.contextValue = 'cclsGoto';
        ti.command = {
            arguments: [element, element.numChildren > 0],
            command: 'ccls.hackGotoForTreeView',
            title: 'Goto',
        };
        if (element.numChildren > 0) {
            if (element.children.length > 0)
                ti.collapsibleState = vscode_1.TreeItemCollapsibleState.Expanded;
            else
                ti.collapsibleState = vscode_1.TreeItemCollapsibleState.Collapsed;
        }
        const elpath = vscode_1.Uri.parse(element.location.uri).path;
        ti.description = `${path.basename(elpath)}:${element.location.range.start.line + 1}`;
        this.onTreeItem(ti, element);
        return ti;
    }
    getChildren(element) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.root)
                return [];
            if (!element)
                return [this.root];
            if (!nodeIsIncomplete(element))
                return element.children;
            return this.onGetChildren(element);
        });
    }
    reveal(editor) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.setContext(this.contextValue, true);
            const position = editor.selection.active;
            const uri = editor.document.uri;
            const callNode = yield this.onReveal(uri, position);
            this.root = callNode;
            this.onDidChangeEmitter.fire(callNode);
            vscode_1.commands.executeCommand('workbench.view.explorer');
        });
    }
    close() {
        utils_1.setContext(this.contextValue, false);
        this.root = undefined;
    }
}
exports.Hierarchy = Hierarchy;
//# sourceMappingURL=hierarchy.js.map