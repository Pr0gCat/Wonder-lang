import {ASTNode, NearleyToken} from './ast_node';

abstract class UnaryExpr extends ASTNode {
    constructor(_unary: NearleyToken, public expr: ASTNode){
        super(_unary, expr);
    }
}

abstract class TwoAtomExpr extends ASTNode {
    constructor(public lhs: ASTNode, public rhs: ASTNode){
        super(lhs, rhs);
    }
}

export class Literal extends ASTNode {
    constructor(val: NearleyToken){
        super(val);
    }

    build(): ASTNode {
        throw new Error('Method not implemented.');
    }
}

/**
 * Unary expressions
 */
export class BinNot extends UnaryExpr {
    build(): ASTNode {
        throw new Error('Method not implemented.');
    }
}

export class Neg extends UnaryExpr {
    build(): ASTNode {
        throw new Error('Method not implemented.');
    }
}

/**
 * 2 atoms expression
 */
export class Add extends TwoAtomExpr {
    build(): ASTNode {
        throw new Error('Method not implemented.');
    }
}

export class Sub extends TwoAtomExpr {
    build(): ASTNode {
        throw new Error('Method not implemented.');
    }
}

export class Mul extends TwoAtomExpr {
    build(): ASTNode {
        throw new Error('Method not implemented.');
    }
}

export class Div extends TwoAtomExpr {
    build(): ASTNode {
        throw new Error('Method not implemented.');
    }
}

export class Mod extends TwoAtomExpr {
    build(): ASTNode {
        throw new Error('Method not implemented.');
    }
}

export class Shl extends TwoAtomExpr {
    build(): ASTNode {
        throw new Error('Method not implemented.');
    }
}

export class Shr extends TwoAtomExpr {
    build(): ASTNode {
        throw new Error('Method not implemented.');
    }
}

export class BinOr extends TwoAtomExpr {
    build(): ASTNode {
        throw new Error('Method not implemented.');
    }
}

export class BinXor extends TwoAtomExpr {
    build(): ASTNode {
        throw new Error('Method not implemented.');
    }
}

export class BinAnd extends TwoAtomExpr{
    build(): ASTNode {
        throw new Error('Method not implemented.');
    }
}

export class BoolOr extends TwoAtomExpr {
    build(): ASTNode {
        throw new Error('Method not implemented.');
    }
}

export class BoolXor extends TwoAtomExpr {
    build(): ASTNode {
        throw new Error('Method not implemented.');
    }
}

export class BoolAnd extends TwoAtomExpr {
    build(): ASTNode {
        throw new Error('Method not implemented.');
    }
}

export class Equal extends TwoAtomExpr {
    build(): ASTNode {
        throw new Error('Method not implemented.');
    }
}

export class NotEqual extends TwoAtomExpr {
    build(): ASTNode {
        throw new Error('Method not implemented.');
    }
}

export class Less extends TwoAtomExpr {
    build(): ASTNode {
        throw new Error('Method not implemented.');
    }
}

export class LessOrEqual extends TwoAtomExpr {
    build(): ASTNode {
        throw new Error('Method not implemented.');
    }
}

export class Greater extends TwoAtomExpr {
    build(): ASTNode {
        throw new Error('Method not implemented.');
    }
}

export class GreaterEqual extends TwoAtomExpr {
    build(): ASTNode {
        throw new Error('Method not implemented.');
    }
}