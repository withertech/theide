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
exports.MemberHierarchyProvider = void 0;
const hierarchy_1 = require("./hierarchy");
var MemberKind;
(function (MemberKind) {
    MemberKind[MemberKind["Func"] = 3] = "Func";
    MemberKind[MemberKind["Var"] = 4] = "Var";
})(MemberKind || (MemberKind = {}));
class MemberHierarchyProvider extends hierarchy_1.Hierarchy {
    constructor(languageClient) {
        super(languageClient, 'ccls.memberHierarchy', 'ccls.closeMemberHierarchy');
        this.contextValue = 'extension.ccls.memberHierarchyVisible';
    }
    onTreeItem(ti, element) {
        const parts = element.fieldName.trim().split(' ');
        const off = parseInt(parts[0], 10);
        let fieldName = '';
        if (isNaN(off) || (parts.length < 3)) {
            fieldName = parts[1];
        }
        else {
            fieldName = parts[2];
            ti.tooltip = `Offset: ${off} bytes`;
        }
        if (fieldName !== undefined) {
            ti.label = fieldName;
            ti.description = `(${element.name}) ` + ti.description;
        }
    }
    onGetChildren(element) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.languageClient.sendRequest('$ccls/member', {
                hierarchy: true,
                id: element.id,
                kind: MemberKind.Var,
                levels: 1,
                qualified: false,
            });
            element.children = result.children;
            return result.children;
        });
    }
    onReveal(uri, position) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.languageClient.sendRequest('$ccls/member', {
                hierarchy: true,
                kind: MemberKind.Var,
                levels: 2,
                position,
                qualified: false,
                textDocument: {
                    uri: uri.toString(true),
                },
            });
        });
    }
}
exports.MemberHierarchyProvider = MemberHierarchyProvider;
//# sourceMappingURL=memberHierarchy.js.map