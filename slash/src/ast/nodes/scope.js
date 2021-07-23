"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopeExpr = void 0;
const ast_node_1 = require("./ast_node");
class ScopeExpr extends ast_node_1.ASTNode {
    constructor(stmts, decls) {
        super(stmts);
        this.stmts = stmts;
        this.decls = decls;
    }
    build() {
        throw new Error("Method not implemented.");
    }
}
exports.ScopeExpr = ScopeExpr;
