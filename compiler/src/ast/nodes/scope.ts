import { ASTNode } from "./ast_node"

export class ScopeExpr extends ASTNode {
    constructor(public stmts: ASTNode[], public decls: []){
        super(stmts);
    }

    build(): ASTNode {
        throw new Error("Method not implemented.");
    }

}
