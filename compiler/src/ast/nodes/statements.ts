import {ASTNode, NearleyToken} from './ast_node';

export class ContinueStmt extends ASTNode {
    constructor(token: NearleyToken){
        super(token);
    }

    build(): ASTNode {
        throw new Error('Method not implemented.');
    }

}

export class BreakStmt extends ASTNode {
    constructor(token: NearleyToken){
        super(token);
    }

    build(): ASTNode {
        throw new Error('Method not implemented.');
    }

}

export class ReturnStmt extends ASTNode {
    constructor(_ret: NearleyToken, public expr: ASTNode){
        super(_ret, expr);
    }

    build(): ASTNode {
        throw new Error('Method not implemented.');
    }

}

export class IncStmt extends ASTNode {
    constructor(tokens: (ASTNode | NearleyToken)[]){
        super(tokens);
    }

    build(): ASTNode {
        throw new Error('Method not implemented.');
    }

}

export class DecStmt extends ASTNode {
    constructor(tokens: (ASTNode | NearleyToken)[]){
        super(tokens);
    }

    build(): ASTNode {
        throw new Error('Method not implemented.');
    }

}

export class AssignStmt extends ASTNode {
    constructor(name_ref: NearleyToken, expr: ASTNode){
        super(name_ref, expr);
    }

    build(): ASTNode {
        throw new Error('Method not implemented.');
    }
}
