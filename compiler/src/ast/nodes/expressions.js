"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreaterEqual = exports.Greater = exports.LessOrEqual = exports.Less = exports.NotEqual = exports.Equal = exports.BoolAnd = exports.BoolXor = exports.BoolOr = exports.BinAnd = exports.BinXor = exports.BinOr = exports.Shr = exports.Shl = exports.Mod = exports.Div = exports.Mul = exports.Sub = exports.Add = exports.Neg = exports.BinNot = exports.Literal = void 0;
const ast_node_1 = require("./ast_node");
class UnaryExpr extends ast_node_1.ASTNode {
    constructor(_unary, expr) {
        super(_unary, expr);
        this.expr = expr;
    }
}
class TwoAtomExpr extends ast_node_1.ASTNode {
    constructor(lhs, rhs) {
        super(lhs, rhs);
        this.lhs = lhs;
        this.rhs = rhs;
    }
}
class Literal extends ast_node_1.ASTNode {
    constructor(val) {
        super(val);
    }
    build() {
        throw new Error('Method not implemented.');
    }
}
exports.Literal = Literal;
class BinNot extends UnaryExpr {
    build() {
        throw new Error('Method not implemented.');
    }
}
exports.BinNot = BinNot;
class Neg extends UnaryExpr {
    build() {
        throw new Error('Method not implemented.');
    }
}
exports.Neg = Neg;
class Add extends TwoAtomExpr {
    build() {
        throw new Error('Method not implemented.');
    }
}
exports.Add = Add;
class Sub extends TwoAtomExpr {
    build() {
        throw new Error('Method not implemented.');
    }
}
exports.Sub = Sub;
class Mul extends TwoAtomExpr {
    build() {
        throw new Error('Method not implemented.');
    }
}
exports.Mul = Mul;
class Div extends TwoAtomExpr {
    build() {
        throw new Error('Method not implemented.');
    }
}
exports.Div = Div;
class Mod extends TwoAtomExpr {
    build() {
        throw new Error('Method not implemented.');
    }
}
exports.Mod = Mod;
class Shl extends TwoAtomExpr {
    build() {
        throw new Error('Method not implemented.');
    }
}
exports.Shl = Shl;
class Shr extends TwoAtomExpr {
    build() {
        throw new Error('Method not implemented.');
    }
}
exports.Shr = Shr;
class BinOr extends TwoAtomExpr {
    build() {
        throw new Error('Method not implemented.');
    }
}
exports.BinOr = BinOr;
class BinXor extends TwoAtomExpr {
    build() {
        throw new Error('Method not implemented.');
    }
}
exports.BinXor = BinXor;
class BinAnd extends TwoAtomExpr {
    build() {
        throw new Error('Method not implemented.');
    }
}
exports.BinAnd = BinAnd;
class BoolOr extends TwoAtomExpr {
    build() {
        throw new Error('Method not implemented.');
    }
}
exports.BoolOr = BoolOr;
class BoolXor extends TwoAtomExpr {
    build() {
        throw new Error('Method not implemented.');
    }
}
exports.BoolXor = BoolXor;
class BoolAnd extends TwoAtomExpr {
    build() {
        throw new Error('Method not implemented.');
    }
}
exports.BoolAnd = BoolAnd;
class Equal extends TwoAtomExpr {
    build() {
        throw new Error('Method not implemented.');
    }
}
exports.Equal = Equal;
class NotEqual extends TwoAtomExpr {
    build() {
        throw new Error('Method not implemented.');
    }
}
exports.NotEqual = NotEqual;
class Less extends TwoAtomExpr {
    build() {
        throw new Error('Method not implemented.');
    }
}
exports.Less = Less;
class LessOrEqual extends TwoAtomExpr {
    build() {
        throw new Error('Method not implemented.');
    }
}
exports.LessOrEqual = LessOrEqual;
class Greater extends TwoAtomExpr {
    build() {
        throw new Error('Method not implemented.');
    }
}
exports.Greater = Greater;
class GreaterEqual extends TwoAtomExpr {
    build() {
        throw new Error('Method not implemented.');
    }
}
exports.GreaterEqual = GreaterEqual;
