// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }
declare var NL: any;
declare var StringWithoutEsc: any;
declare var Identifier: any;
declare var DecLiteral: any;
declare var BinLiteral: any;
declare var HexLiteral: any;
declare var TrueLiteral: any;
declare var FalseLiteral: any;
declare var FloatLiteral: any;
declare var SciNotationLiteral: any;

// issue: https://github.com/kach/nearley/issues/527#issuecomment-734847077
import { default as lexer_moo} from "./lexer";
const lexer = (lexer_moo as unknown) as NearleyLexer;

import * as nodes from "./ast/nodes";

let io = {imports: [], exports: []}
let decls = [];
let scopes = [];

function reset_tables(){
        io.imports = [];
        io.exports = [];
        decls = [];
}

interface NearleyToken {
  value: any;
  [key: string]: any;
};

interface NearleyLexer {
  reset: (chunk: string, info: any) => void;
  next: () => NearleyToken | undefined;
  save: () => any;
  formatError: (token: never) => string;
  has: (tokenType: string) => boolean;
};

interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any;
};

type NearleySymbol = string | { literal: any } | { test: (token: any) => boolean };

interface Grammar {
  Lexer: NearleyLexer | undefined;
  ParserRules: NearleyRule[];
  ParserStart: string;
};

const grammar: Grammar = {
  Lexer: lexer,
  ParserRules: [
    {"name": "Program$ebnf$1", "symbols": []},
    {"name": "Program$ebnf$1", "symbols": ["Program$ebnf$1", (lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Program$ebnf$2", "symbols": []},
    {"name": "Program$ebnf$2$subexpression$1$ebnf$1", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "Program$ebnf$2$subexpression$1$ebnf$1", "symbols": ["Program$ebnf$2$subexpression$1$ebnf$1", (lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Program$ebnf$2$subexpression$1", "symbols": ["Statement", "Program$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "Program$ebnf$2", "symbols": ["Program$ebnf$2", "Program$ebnf$2$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Program", "symbols": ["Program$ebnf$1", "Program$ebnf$2"], "postprocess": tokens => tokens[1].length ? tokens[1][0][0][0] : tokens[1]},
    {"name": "Statement", "symbols": ["ImportStmt"]},
    {"name": "Statement", "symbols": ["VarDeclStmt"]},
    {"name": "Statement", "symbols": ["UnaryStmt"]},
    {"name": "Statement", "symbols": ["AssignStmt"]},
    {"name": "Statement", "symbols": ["IfStmt"]},
    {"name": "Statement", "symbols": ["FuncDeclStmt"]},
    {"name": "Statement", "symbols": ["ContinueStmt"]},
    {"name": "Statement", "symbols": ["BreakStmt"]},
    {"name": "Statement", "symbols": ["ReturnStmt"]},
    {"name": "ImportStmt$ebnf$1$subexpression$1$subexpression$1", "symbols": ["ImportPath"]},
    {"name": "ImportStmt$ebnf$1$subexpression$1$subexpression$1", "symbols": ["NameRef"]},
    {"name": "ImportStmt$ebnf$1$subexpression$1", "symbols": [{"literal":"from"}, "ImportStmt$ebnf$1$subexpression$1$subexpression$1"]},
    {"name": "ImportStmt$ebnf$1", "symbols": ["ImportStmt$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "ImportStmt$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "ImportStmt", "symbols": ["ImportStmt$ebnf$1", {"literal":"import"}, "ImportItemGroup"], "postprocess": 
        ([from_part, _import, items]) => {
            console.log('from', from_part);
            console.log('items', items);
            for(let item of items){
                stmts.push();
            }
            return ...stmts;
        }
        },
    {"name": "ImportPath", "symbols": [(lexer.has("StringWithoutEsc") ? {type: "StringWithoutEsc"} : StringWithoutEsc)], "postprocess": id},
    {"name": "ImportItemGroup", "symbols": ["ImportItem"], "postprocess": id},
    {"name": "ImportItemGroup", "symbols": ["ImportItemGroup", {"literal":","}, "ImportItem"], "postprocess": ([gp, _, item]) => [...gp, item]},
    {"name": "ImportItem$ebnf$1$subexpression$1", "symbols": [{"literal":"as"}, (lexer.has("Identifier") ? {type: "Identifier"} : Identifier)]},
    {"name": "ImportItem$ebnf$1", "symbols": ["ImportItem$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "ImportItem$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "ImportItem", "symbols": [(lexer.has("Identifier") ? {type: "Identifier"} : Identifier), "ImportItem$ebnf$1"], "postprocess": id},
    {"name": "VarDeclStmt", "symbols": [{"literal":"let"}, "IdentList", {"literal":"="}, "ExprList"], "postprocess": 
            
        },
    {"name": "UnaryStmt", "symbols": ["NameRef", {"literal":"++"}], "postprocess": tokens => new nodes.IncStmt(tokens)},
    {"name": "UnaryStmt", "symbols": ["NameRef", {"literal":"--"}], "postprocess": tokens => new nodes.DecStmt(tokens)},
    {"name": "AssignStmt", "symbols": ["NameRef", {"literal":"="}, "Expression"]},
    {"name": "AssignStmt", "symbols": ["NameRef", {"literal":"+="}, "Expression"]},
    {"name": "AssignStmt", "symbols": ["NameRef", {"literal":"-="}, "Expression"]},
    {"name": "AssignStmt", "symbols": ["NameRef", {"literal":"*="}, "Expression"]},
    {"name": "AssignStmt", "symbols": ["NameRef", {"literal":"/="}, "Expression"]},
    {"name": "AssignStmt", "symbols": ["NameRef", {"literal":"%="}, "Expression"]},
    {"name": "AssignStmt", "symbols": ["NameRef", {"literal":"<<="}, "Expression"]},
    {"name": "AssignStmt", "symbols": ["NameRef", {"literal":">>="}, "Expression"]},
    {"name": "AssignStmt", "symbols": ["NameRef", {"literal":"|="}, "Expression"]},
    {"name": "AssignStmt", "symbols": ["NameRef", {"literal":"&="}, "Expression"]},
    {"name": "AssignStmt", "symbols": ["NameRef", {"literal":"^="}, "Expression"]},
    {"name": "FuncDeclStmt$ebnf$1", "symbols": ["ParamList"], "postprocess": id},
    {"name": "FuncDeclStmt$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "FuncDeclStmt", "symbols": [{"literal":"func"}, (lexer.has("Identifier") ? {type: "Identifier"} : Identifier), {"literal":"("}, "FuncDeclStmt$ebnf$1", {"literal":")"}, "BlockExpr"]},
    {"name": "IfStmt$ebnf$1$subexpression$1", "symbols": ["ElifStmt"]},
    {"name": "IfStmt$ebnf$1$subexpression$1", "symbols": ["ElseStmt"]},
    {"name": "IfStmt$ebnf$1", "symbols": ["IfStmt$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "IfStmt$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "IfStmt", "symbols": [{"literal":"if"}, "Expression", "BlockExpr", "IfStmt$ebnf$1"]},
    {"name": "ElifStmt$ebnf$1$subexpression$1", "symbols": ["ElifStmt"]},
    {"name": "ElifStmt$ebnf$1$subexpression$1", "symbols": ["ElseStmt"]},
    {"name": "ElifStmt$ebnf$1", "symbols": ["ElifStmt$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "ElifStmt$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "ElifStmt", "symbols": [{"literal":"elif"}, "Expression", "BlockExpr", "ElifStmt$ebnf$1"]},
    {"name": "ElseStmt", "symbols": [{"literal":"else"}, "BlockExpr"], "postprocess": },
    {"name": "ContinueStmt", "symbols": [{"literal":"continue"}], "postprocess": [token] => new nodes.ContinueStmt(token)},
    {"name": "BreakStmt", "symbols": [{"literal":"break"}], "postprocess": [token] => new nodes.BreakStmt(token)},
    {"name": "ReturnStmt$ebnf$1", "symbols": ["Expression"], "postprocess": id},
    {"name": "ReturnStmt$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "ReturnStmt", "symbols": [{"literal":"return"}, "ReturnStmt$ebnf$1"], "postprocess": [ret, expr] => new nodes.ReturnStmt(ret, expr)},
    {"name": "Expression", "symbols": [{"literal":"("}, "Expression", {"literal":")"}], "postprocess": tokens => tokens[1]},
    {"name": "Expression", "symbols": ["CompareExpr"]},
    {"name": "Expression", "symbols": ["BinOpExpr"]},
    {"name": "Expression", "symbols": ["BoolOpExpr"]},
    {"name": "Expression", "symbols": ["NameRef"]},
    {"name": "Expression", "symbols": ["BlockExpr"]},
    {"name": "Expression", "symbols": ["FunctionCallExpr"]},
    {"name": "BlockExpr$ebnf$1", "symbols": []},
    {"name": "BlockExpr$ebnf$1$subexpression$1$ebnf$1", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "BlockExpr$ebnf$1$subexpression$1$ebnf$1", "symbols": ["BlockExpr$ebnf$1$subexpression$1$ebnf$1", (lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "BlockExpr$ebnf$1$subexpression$1", "symbols": ["Statement", "BlockExpr$ebnf$1$subexpression$1$ebnf$1"]},
    {"name": "BlockExpr$ebnf$1", "symbols": ["BlockExpr$ebnf$1", "BlockExpr$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "BlockExpr", "symbols": [{"literal":"{"}, "BlockExpr$ebnf$1", {"literal":"}"}]},
    {"name": "CompareExpr", "symbols": ["Expression", {"literal":"=="}, "Expression"], "postprocess": [lhs, _, rhs] => new nodes.Equal(lhs, rhs)},
    {"name": "CompareExpr", "symbols": ["Expression", {"literal":"!="}, "Expression"], "postprocess": [lhs, _, rhs] => new nodes.NotEqual(lhs, rhs)},
    {"name": "CompareExpr", "symbols": ["Expression", {"literal":"<"}, "Expression"], "postprocess": [lhs, _, rhs] => new nodes.Less(lhs, rhs)},
    {"name": "CompareExpr", "symbols": ["Expression", {"literal":"<="}, "Expression"], "postprocess": [lhs, _, rhs] => new nodes.LessThan(lhs, rhs)},
    {"name": "CompareExpr", "symbols": ["Expression", {"literal":">"}, "Expression"], "postprocess": [lhs, _, rhs] => new nodes.Greater(lhs, rhs)},
    {"name": "CompareExpr", "symbols": ["Expression", {"literal":">="}, "Expression"], "postprocess": [lhs, _, rhs] => new nodes.GreaterEqual(lhs, rhs)},
    {"name": "BinOpExpr", "symbols": ["BinOr"]},
    {"name": "BinOr", "symbols": ["BinXor"]},
    {"name": "BinOr", "symbols": ["BinOr", {"literal":"|"}, "BinXor"], "postprocess": [lhs, _, rhs] => new nodes.BinOr(lhs, rhs)},
    {"name": "BinXor", "symbols": ["BinAnd"]},
    {"name": "BinXor", "symbols": ["BinXor", {"literal":"^"}, "BinAnd"], "postprocess": [lhs, _, rhs] => new nodes.BinXor(lhs, rhs)},
    {"name": "BinAnd", "symbols": ["BinShift"]},
    {"name": "BinAnd", "symbols": ["BinAnd", {"literal":"&"}, "BinShift"], "postprocess": [lhs, _, rhs] => new nodes.BinAnd(lhs, rhs)},
    {"name": "BinShift", "symbols": ["BinAddSub"]},
    {"name": "BinShift", "symbols": ["BinShift", {"literal":"<<"}, "BinAddSub"], "postprocess": [lhs, _, rhs] => new nodes.Shl(lhs, rhs)},
    {"name": "BinShift", "symbols": ["BinShift", {"literal":">>"}, "BinAddSub"], "postprocess": [lhs, _, rhs] => new nodes.Shr(lhs, rhs)},
    {"name": "BinAddSub", "symbols": ["BinMulDiv"]},
    {"name": "BinAddSub", "symbols": ["BinAddSub", {"literal":"-"}, "BinMulDiv"], "postprocess": [lhs, _, rhs] => new nodes.Sub(lhs, rhs)},
    {"name": "BinAddSub", "symbols": ["BinAddSub", {"literal":"+"}, "BinMulDiv"], "postprocess": [lhs, _, rhs] => new nodes.Add(lhs, rhs)},
    {"name": "BinMulDiv", "symbols": ["BinUnary"]},
    {"name": "BinMulDiv", "symbols": ["BinMulDiv", {"literal":"*"}, "BinUnary"], "postprocess": [lhs, _, rhs] => new nodes.Mul(lhs, rhs)},
    {"name": "BinMulDiv", "symbols": ["BinMulDiv", {"literal":"/"}, "BinUnary"], "postprocess": [lhs, _, rhs] => new nodes.Div(lhs, rhs)},
    {"name": "BinMulDiv", "symbols": ["BinMulDiv", {"literal":"%"}, "BinUnary"], "postprocess": [lhs, _, rhs] => new nodes.Mod(lhs, rhs)},
    {"name": "BinUnary", "symbols": ["Literal"], "postprocess": id},
    {"name": "BinUnary", "symbols": [{"literal":"!"}, "Literal"], "postprocess": [sym, expr] => new nodes.BinNot(sym, expr)},
    {"name": "BinUnary", "symbols": [{"literal":"-"}, "Literal"], "postprocess": [sym, expr] => new nodes.Neg(sym, expr)},
    {"name": "BoolOpExpr", "symbols": ["BoolOr"]},
    {"name": "BoolOr", "symbols": ["BoolXor"]},
    {"name": "BoolOr", "symbols": ["BoolOr", {"literal":"or"}, "BoolXor"], "postprocess": [lhs, _, rhs] => new nodes.BoolOr(lhs, rhs)},
    {"name": "BoolXor", "symbols": ["BoolAnd"]},
    {"name": "BoolXor", "symbols": ["BoolXor", {"literal":"xor"}, "BoolAnd"], "postprocess": [lhs, _, rhs] => new nodes.BoolXor(lhs, rhs)},
    {"name": "BoolAnd", "symbols": ["BoolNot"]},
    {"name": "BoolAnd", "symbols": ["BoolAnd", {"literal":"and"}, "BoolNot"], "postprocess": [lhs, _, rhs] => new nodes.BoolAnd(lhs, rhs)},
    {"name": "BoolNot$ebnf$1", "symbols": [{"literal":"not"}], "postprocess": id},
    {"name": "BoolNot$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "BoolNot", "symbols": ["BoolNot$ebnf$1", "CompareExpr"], "postprocess": 
        [not, expr] => {
                console.log(not, expr);
        }
        },
    {"name": "Literal", "symbols": [(lexer.has("DecLiteral") ? {type: "DecLiteral"} : DecLiteral)], "postprocess": [tok] => return new nodes.Literal(tok)},
    {"name": "Literal", "symbols": [(lexer.has("BinLiteral") ? {type: "BinLiteral"} : BinLiteral)], "postprocess": [tok] => return new nodes.Literal(tok)},
    {"name": "Literal", "symbols": [(lexer.has("HexLiteral") ? {type: "HexLiteral"} : HexLiteral)], "postprocess": [tok] => return new nodes.Literal(tok)},
    {"name": "Literal", "symbols": [(lexer.has("TrueLiteral") ? {type: "TrueLiteral"} : TrueLiteral)], "postprocess": [tok] => return new nodes.Literal(tok)},
    {"name": "Literal", "symbols": [(lexer.has("FalseLiteral") ? {type: "FalseLiteral"} : FalseLiteral)], "postprocess": [tok] => return new nodes.Literal(tok)},
    {"name": "Literal", "symbols": [(lexer.has("FloatLiteral") ? {type: "FloatLiteral"} : FloatLiteral)], "postprocess": [tok] => return new nodes.Literal(tok)},
    {"name": "Literal", "symbols": [(lexer.has("SciNotationLiteral") ? {type: "SciNotationLiteral"} : SciNotationLiteral)], "postprocess": [tok] => return new nodes.Literal(tok)},
    {"name": "Literal", "symbols": [(lexer.has("StringWithoutEsc") ? {type: "StringWithoutEsc"} : StringWithoutEsc)], "postprocess": [tok] => return new nodes.Literal(tok)},
    {"name": "FunctionCallExpr$ebnf$1", "symbols": ["ExprList"], "postprocess": id},
    {"name": "FunctionCallExpr$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "FunctionCallExpr", "symbols": ["NameRef", {"literal":"("}, "FunctionCallExpr$ebnf$1", {"literal":")"}]},
    {"name": "ExprList", "symbols": ["Expression"], "postprocess": tokens => [tokens[0]]},
    {"name": "ExprList", "symbols": ["ExprList", {"literal":","}, "Expression"], "postprocess": tokens => [...tokens[0], tokens[2]]},
    {"name": "IdentList", "symbols": [(lexer.has("Identifier") ? {type: "Identifier"} : Identifier)], "postprocess": tokens => [tokens[0]]},
    {"name": "IdentList", "symbols": ["IdentList", {"literal":","}, (lexer.has("Identifier") ? {type: "Identifier"} : Identifier)], "postprocess": tokens => [...tokens[0], tokens[2]]},
    {"name": "ParamList", "symbols": ["ParameterDecl"], "postprocess": tokens => [tokens[0]]},
    {"name": "ParamList", "symbols": ["ParamList", {"literal":","}, "ParameterDecl"], "postprocess": tokens => [...tokens[0], tokens[2]]},
    {"name": "NameRef", "symbols": [(lexer.has("Identifier") ? {type: "Identifier"} : Identifier)], "postprocess": tokens => [tokens[0]]},
    {"name": "NameRef", "symbols": ["NameRef", {"literal":"."}, (lexer.has("Identifier") ? {type: "Identifier"} : Identifier)], "postprocess": ([refs, _, name]) => [...refs, name]},
    {"name": "ParameterDecl", "symbols": ["NameRef", (lexer.has("Identifier") ? {type: "Identifier"} : Identifier)], "postprocess": [_type, name] => {}}
  ],
  ParserStart: "Program",
};

export default grammar;
