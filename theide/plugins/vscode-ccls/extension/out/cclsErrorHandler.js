"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CclsErrorHandler = void 0;
const vscode_1 = require("vscode");
const vscode_languageclient_1 = require("vscode-languageclient");
const globalContext_1 = require("./globalContext");
class CclsErrorHandler {
    constructor(config) {
        this.config = config;
    }
    error(error, message, count) {
        globalContext_1.logChan(`ccls error (count ${count}): ${message}`);
        return vscode_languageclient_1.ErrorAction.Continue;
    }
    closed() {
        globalContext_1.logChan(`ccls server connection was closed`);
        const notifyOnCrash = this.config.get('launch.notifyOnCrash');
        const restart = this.config.get('launch.autoRestart');
        if (notifyOnCrash) {
            vscode_1.window.showInformationMessage(restart ? 'ccls has crashed; it has been restarted.' :
                'ccls has crashed; it has not been restarted.');
        }
        if (restart)
            return vscode_languageclient_1.CloseAction.Restart;
        return vscode_languageclient_1.CloseAction.DoNotRestart;
    }
}
exports.CclsErrorHandler = CclsErrorHandler;
//# sourceMappingURL=cclsErrorHandler.js.map