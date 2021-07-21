"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignStmt = exports.DecStmt = exports.IncStmt = exports.ReturnStmt = exports.BreakStmt = exports.ContinueStmt = void 0;
const ast_node_1 = require("./ast_node");
class ContinueStmt extends ast_node_1.ASTNode {
    constructor(token) {
        super(token);
    }
    build() {
        throw new Error('Method not implemented.');
    }
}
exports.ContinueStmt = ContinueStmt;
class BreakStmt extends ast_node_1.ASTNode {
    constructor(token) {
        super(token);
    }
    build() {
        throw new Error('Method not implemented.');
    }
}
exports.BreakStmt = BreakStmt;
class ReturnStmt extends ast_node_1.ASTNode {
    constructor(_ret, expr) {
        super(_ret, expr);
        this.expr = expr;
    }
    build() {
        throw new Error('Method not implemented.');
    }
}
exports.ReturnStmt = ReturnStmt;
class IncStmt extends ast_node_1.ASTNode {
    constructor(tokens) {
        super(tokens);
    }
    build() {
        throw new Error('Method not implemented.');
    }
}
exports.IncStmt = IncStmt;
class DecStmt extends ast_node_1.ASTNode {
    constructor(tokens) {
        super(tokens);
    }
    build() {
        throw new Error('Method not implemented.');
    }
}
exports.DecStmt = DecStmt;
class AssignStmt extends ast_node_1.ASTNode {
    constructor(name_ref, expr) {
        super(name_ref, expr);
    }
    build() {
        throw new Error('Method not implemented.');
    }
}
exports.AssignStmt = AssignStmt;
