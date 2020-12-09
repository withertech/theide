"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InactiveRegionsProvider = void 0;
const vscode_1 = require("vscode");
const utils_1 = require("./utils");
class InactiveRegionsProvider {
    constructor(client) {
        this.client = client;
        this.skippedRanges = new Map();
        this._dispose = [];
        const config = vscode_1.workspace.getConfiguration('ccls');
        this.decorationType = vscode_1.window.createTextEditorDecorationType({
            dark: {
                backgroundColor: config.get('theme.dark.skippedRange.backgroundColor'),
                color: config.get('theme.dark.skippedRange.textColor'),
            },
            isWholeLine: true,
            light: {
                backgroundColor: config.get('theme.light.skippedRange.backgroundColor'),
                color: config.get('theme.light.skippedRange.textColor'),
            },
            rangeBehavior: vscode_1.DecorationRangeBehavior.ClosedClosed
        });
        // await this.client.onReady();
        this.client.onNotification("$ccls/publishSkippedRanges", (args) => this.onSkippedRanges(args));
        this._dispose.push(vscode_1.window.onDidChangeActiveTextEditor((editor) => this.onChangeTextEditor(editor)));
        // This only got called during dispose, which perfectly matches our goal.
        this._dispose.push(vscode_1.workspace.onDidCloseTextDocument((document) => this.skippedRanges.delete(document.uri.toString(true))));
    }
    dispose() {
        utils_1.disposeAll(this._dispose);
    }
    onChangeTextEditor(editor) {
        if (!editor)
            return;
        const uri = editor.document.uri.toString(true);
        const range = this.skippedRanges.get(uri);
        if (range) {
            editor.setDecorations(this.decorationType, range);
        }
    }
    onSkippedRanges({ uri, skippedRanges }) {
        uri = utils_1.normalizeUri(uri);
        let ranges = skippedRanges
            .map(this.client.protocol2CodeConverter.asRange)
            .filter((e) => e !== undefined);
        ranges = ranges.map((range) => {
            if (range.isEmpty || range.isSingleLine)
                return range;
            return range.with({ end: range.end.translate(-1, 23333) });
        });
        this.skippedRanges.set(uri, ranges);
        vscode_1.window.visibleTextEditors
            .filter((editor) => editor.document.uri.toString(true) === uri)
            .forEach((editor) => editor.setDecorations(this.decorationType, ranges));
    }
}
exports.InactiveRegionsProvider = InactiveRegionsProvider;
//# sourceMappingURL=inactiveRegions.js.map