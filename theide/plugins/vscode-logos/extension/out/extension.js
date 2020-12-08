"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const Code = require("vscode");
const information_1 = require("./information");
function activate(context) {
    console.log('Logos Syntax Support has been enabled');
    const hoverProvider = Code.languages.registerHoverProvider('logos', {
        provideHover(document, position) {
            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);
            return information_1.getHover(word);
        },
    });
    const completionProvider = Code.languages.registerCompletionItemProvider('logos', {
        provideCompletionItems(document, position) {
            const lineCharacter = document
                .lineAt(position)
                .text.substring(0, position.character);
            if (lineCharacter.startsWith('%')) {
                return information_1.getCompletions();
            }
            else {
                return undefined;
            }
        },
    }, '%');
    context.subscriptions.push(completionProvider, hoverProvider);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map