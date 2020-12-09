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
exports.GlobalContext = exports.logChan = exports.cclsChan = void 0;
const vscode_1 = require("vscode");
const serverContext_1 = require("./serverContext");
const utils_1 = require("./utils");
function logChan(msg) {
    if (!exports.cclsChan) {
        console.error('!! ' + msg);
        return;
    }
    exports.cclsChan.appendLine(msg);
}
exports.logChan = logChan;
class GlobalContext {
    constructor() {
        this._dispose = [];
        this._isRunning = false;
        this.chan = vscode_1.window.createOutputChannel('ccls');
        exports.cclsChan = this.chan;
        this._dispose.push(this.chan);
        const wss = vscode_1.workspace.workspaceFolders;
        if (!wss || wss.length === 0)
            throw Error("No workspace opened");
        this._srvCwd = wss[0].uri.fsPath;
        logChan(`Server CWD is ${this._srvCwd}`);
        this._server = new serverContext_1.ServerContext(this._srvCwd);
        this._dispose.push(vscode_1.commands.registerCommand('ccls.restart', () => __awaiter(this, void 0, void 0, function* () { return this.restartCmd(); })));
        this._dispose.push(vscode_1.commands.registerCommand('ccls.restartLazy', () => __awaiter(this, void 0, void 0, function* () { return this.restartCmd(true); })));
    }
    dispose() {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.disposeAll(this._dispose);
            return this.stopServer();
        });
    }
    startServer() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._isRunning)
                throw new Error("Server is already running");
            yield this._server.start();
            this._isRunning = true;
        });
    }
    stopServer() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._isRunning) {
                this._isRunning = false;
                yield this._server.stop();
                this._server.dispose();
            }
        });
    }
    restartCmd(lazy = false) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.stopServer();
            this._server = new serverContext_1.ServerContext(this._srvCwd, lazy);
            this.chan.appendLine(`Restarting ccls, lazy mode ${lazy ? 'on' : 'off'}`);
            return this.startServer();
        });
    }
}
exports.GlobalContext = GlobalContext;
//# sourceMappingURL=globalContext.js.map