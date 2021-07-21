import { ExpectType, Rule, Any, OneOf, Some } from "./tree-builder";

const LineEnd = OneOf([ExpectType('Comment'), ExpectType('NL')]);
const ImportDecl = ExpectType('Comment');
const Statement = ExpectType('Comment');

// Call this to build AST
const ProgramSyntax = Rule([
    Any(LineEnd), 
    Any(Rule([ImportDecl, Some(LineEnd)], (imports, _) => imports)), 
    Any(Rule([Statement, Some(LineEnd)], (stmts, _) => stmts))
], (_, imports, stmts) => { return {success: true, content: [imports, stmts]}; });

export default ProgramSyntax;

