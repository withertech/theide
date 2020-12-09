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
exports.CallHierarchyProvider = void 0;
const vscode_1 = require("vscode");
const utils_1 = require("../utils");
const hierarchy_1 = require("./hierarchy");
var CallType;
(function (CallType) {
    CallType[CallType["Normal"] = 0] = "Normal";
    CallType[CallType["Base"] = 1] = "Base";
    CallType[CallType["Derived"] = 2] = "Derived";
    CallType[CallType["All"] = 3] = "All"; // Normal and Base and Derived
})(CallType || (CallType = {}));
class CallHierarchyProvider extends hierarchy_1.Hierarchy {
    constructor(languageClient, qualified) {
        super(languageClient, 'ccls.callHierarchy', 'ccls.closeCallHierarchy');
        this.contextValue = 'extension.ccls.callHierarchyVisible';
        this.useCallee = false;
        this.qualified = false;
        this.baseIcon = {
            dark: utils_1.resourcePath("base-dark.svg"),
            light: utils_1.resourcePath("base-light.svg")
        };
        this.derivedIcon = {
            dark: utils_1.resourcePath("derived-dark.svg"),
            light: utils_1.resourcePath("derived-light.svg")
        };
        this.qualified = qualified;
        this._dispose.push(vscode_1.commands.registerCommand("ccls.call.useCallers", () => this.updateCallee(false)));
        this._dispose.push(vscode_1.commands.registerCommand("ccls.call.useCallees", () => this.updateCallee(true)));
    }
    onTreeItem(ti, element) {
        if (element.callType === CallType.Base)
            ti.iconPath = this.baseIcon;
        else if (element.callType === CallType.Derived)
            ti.iconPath = this.derivedIcon;
    }
    onGetChildren(element) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.languageClient.sendRequest('$ccls/call', {
                callType: CallType.All,
                callee: this.useCallee,
                hierarchy: true,
                id: element.id,
                levels: 1,
                qualified: this.qualified,
            });
            element.children = result.children;
            return result.children;
        });
    }
    onReveal(uri, position) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.languageClient.sendRequest('$ccls/call', {
                callType: CallType.All,
                callee: this.useCallee,
                hierarchy: true,
                levels: 2,
                position,
                qualified: this.qualified,
                textDocument: {
                    uri: uri.toString(true),
                },
            });
        });
    }
    updateCallee(val) {
        this.useCallee = val;
        if (this.root) {
            this.root.children = [];
            this.onDidChangeEmitter.fire(this.root);
        }
    }
}
exports.CallHierarchyProvider = CallHierarchyProvider;
//# sourceMappingURL=callHierarchy.js.map