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
exports.jumpToUriAtPosition = void 0;
const vscode_1 = require("vscode");
function jumpToUriAtPosition(uri, position, preserveFocus) {
    return __awaiter(this, void 0, void 0, function* () {
        const d = yield vscode_1.workspace.openTextDocument(uri);
        const editor = vscode_1.window.activeTextEditor;
        if (!editor) {
            console.log("!editor");
            return;
        }
        if (!d) {
            editor.revealRange(new vscode_1.Range(position, position), vscode_1.TextEditorRevealType.InCenter);
            editor.selection = new vscode_1.Selection(position, position);
        }
        else {
            const e = yield vscode_1.window.showTextDocument(d, undefined, preserveFocus);
            e.revealRange(new vscode_1.Range(position, position), vscode_1.TextEditorRevealType.InCenter);
            e.selection = new vscode_1.Selection(position, position);
        }
    });
}
exports.jumpToUriAtPosition = jumpToUriAtPosition;
//# sourceMappingURL=vscodeUtils.js.map