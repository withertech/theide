"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Completions = void 0;
const Code = require("vscode");
// Constructor
const ctor = new Code.CompletionItem('ctor');
ctor.kind = Code.CompletionItemKind.Constructor;
ctor.insertText = new Code.SnippetString('ctor {${1}}');
ctor.detail = 'Logos Constructor';
ctor.documentation = new Code.MarkdownString('Generate an anonymous constructor (of default priority).\nThis function is executed after the binary is loaded into memory.\n`argc`, `argv`, and `envp` are implicit arguments so they can be used as they would be in a `main` function.');
// Deconstructor
const dtor = new Code.CompletionItem('dtor');
dtor.kind = Code.CompletionItemKind.Constructor;
dtor.insertText = new Code.SnippetString('dtor {${1}}');
dtor.detail = 'Logos Deconstructor';
exports.Completions = [ctor];
//# sourceMappingURL=completions.js.map