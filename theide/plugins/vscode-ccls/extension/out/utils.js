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
exports.wait = exports.dedent = exports.setContext = exports.normalizeUri = exports.disposeAll = exports.unwrap = exports.resourcePath = void 0;
const path = require("path");
const util = require("util");
const vscode_1 = require("vscode");
function resourcePath(...paths) {
    return path.join(__dirname, "..", "resources", ...paths);
}
exports.resourcePath = resourcePath;
function unwrap(value, tip = "?") {
    if (value === undefined)
        throw new Error("undefined " + tip);
    return value;
}
exports.unwrap = unwrap;
function disposeAll(items) {
    return items.reverse().map((d) => d.dispose());
}
exports.disposeAll = disposeAll;
function normalizeUri(u) {
    return vscode_1.Uri.parse(u).toString(true);
}
exports.normalizeUri = normalizeUri;
function setContext(name, value) {
    vscode_1.commands.executeCommand("setContext", name, value);
}
exports.setContext = setContext;
function dedent(templateStrings, ...args) {
    const strings = templateStrings.map((value) => value.replace(/\r?\n[ ]*$/, '\n'));
    let result = strings[0];
    for (let i = 0; i < args.length; i++) {
        result += args[i] + strings[i + 1];
    }
    return result;
}
exports.dedent = dedent;
const setTimeoutPromised = util.promisify(setTimeout);
function wait(millisecs) {
    return __awaiter(this, void 0, void 0, function* () {
        return setTimeoutPromised(millisecs);
    });
}
exports.wait = wait;
//# sourceMappingURL=utils.js.map