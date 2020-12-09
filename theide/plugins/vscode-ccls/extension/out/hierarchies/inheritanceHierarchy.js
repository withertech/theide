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
exports.InheritanceHierarchyProvider = void 0;
const hierarchy_1 = require("./hierarchy");
function InheritanceHierarchySetWantsDerived(node, value) {
    node.wantsDerived = value;
    node.children.map((c) => InheritanceHierarchySetWantsDerived(c, value));
}
class InheritanceHierarchyProvider extends hierarchy_1.Hierarchy {
    constructor(languageClient) {
        super(languageClient, 'ccls.inheritanceHierarchy', 'ccls.closeInheritanceHierarchy');
        this.languageClient = languageClient;
        this.contextValue = 'extension.ccls.inheritanceHierarchyVisible';
    }
    onTreeItem(ti, element) {
        if (element.isBaseLabel)
            ti.description = undefined;
    }
    onGetChildren(element) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.languageClient.sendRequest('$ccls/inheritance', {
                derived: element.wantsDerived,
                hierarchy: true,
                id: element.id,
                kind: element.kind,
                levels: 1,
                qualified: false,
            });
            element.children = result.children;
            result.children.map((c) => InheritanceHierarchySetWantsDerived(c, element.wantsDerived));
            return result.children;
        });
    }
    onReveal(uri, position) {
        return __awaiter(this, void 0, void 0, function* () {
            const entry = yield this.languageClient.sendRequest('$ccls/inheritance', {
                derived: true,
                hierarchy: true,
                levels: 1,
                position,
                qualified: false,
                textDocument: {
                    uri: uri.toString(true),
                },
            });
            InheritanceHierarchySetWantsDerived(entry, true);
            const parentEntry = yield this.languageClient.sendRequest('$ccls/inheritance', {
                derived: false,
                hierarchy: true,
                id: entry.id,
                kind: entry.kind,
                levels: 1,
                qualified: false,
            });
            if (parentEntry.numChildren > 0) {
                const parentWrapper = {
                    children: parentEntry.children,
                    id: undefined,
                    isBaseLabel: true,
                    kind: -1,
                    location: parentEntry.location,
                    name: '[[Base]]',
                    numChildren: parentEntry.children.length,
                    wantsDerived: false,
                };
                InheritanceHierarchySetWantsDerived(parentWrapper, false);
                entry.children.unshift(parentWrapper);
                entry.numChildren += 1;
            }
            return entry;
        });
    }
}
exports.InheritanceHierarchyProvider = InheritanceHierarchyProvider;
//# sourceMappingURL=inheritanceHierarchy.js.map