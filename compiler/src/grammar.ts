// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }
declare var String: any;
declare var Identifier: any;
declare var DecLiteral: any;
declare var BinLiteral: any;
declare var HexLiteral: any;
declare var TrueLiteral: any;
declare var FalseLiteral: any;
declare var FloatLiteral: any;
declare var SciNotationLiteral: any;
declare var StringWithoutEsc: any;
declare var Character: any;
declare var Comment: any;
declare var NL: any;

// issue: https://github.com/kach/nearley/issues/527#issuecomment-734847077
import { default as lexer_moo} from "./lexer";
const lexer = (lexer_moo as unknown) as NearleyLexer;

import {
	// TODO: Add all AST nodes here
} from "./ast/nodes";


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
    {"name": "Program$ebnf$1", "symbols": ["Program$ebnf$1", "LineEnd"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Program$ebnf$2", "symbols": []},
    {"name": "Program$ebnf$2$subexpression$1$ebnf$1", "symbols": ["LineEnd"]},
    {"name": "Program$ebnf$2$subexpression$1$ebnf$1", "symbols": ["Program$ebnf$2$subexpression$1$ebnf$1", "LineEnd"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Program$ebnf$2$subexpression$1", "symbols": ["ImportDecl", "Program$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "Program$ebnf$2", "symbols": ["Program$ebnf$2", "Program$ebnf$2$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Program$ebnf$3", "symbols": []},
    {"name": "Program$ebnf$3$subexpression$1$ebnf$1", "symbols": ["LineEnd"]},
    {"name": "Program$ebnf$3$subexpression$1$ebnf$1", "symbols": ["Program$ebnf$3$subexpression$1$ebnf$1", "LineEnd"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Program$ebnf$3$subexpression$1", "symbols": ["Statement", "Program$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "Program$ebnf$3", "symbols": ["Program$ebnf$3", "Program$ebnf$3$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Program", "symbols": ["Program$ebnf$1", "Program$ebnf$2", "Program$ebnf$3"], "postprocess": 
        ([nl, imports, stmts]) => {
        	let comments: object[] = [...nl.flat(Infinity)];
        	imports.forEach((item: any) => {
        		comments.push(...item[1]);
        	});
        	return {
        		imports: imports.map(function(d:object[]){ return d[0]; }).flat(Infinity),
        		tree: stmts.map(function(d:object[]){ return d[0]; }),
        		comments: comments.filter((item: any) => item.type != 'NL'),
        	}
        }
        },
    {"name": "ImportDecl$ebnf$1$subexpression$1$subexpression$1", "symbols": ["ImportPath"]},
    {"name": "ImportDecl$ebnf$1$subexpression$1$subexpression$1", "symbols": ["NameRef"]},
    {"name": "ImportDecl$ebnf$1$subexpression$1", "symbols": [{"literal":"from"}, "ImportDecl$ebnf$1$subexpression$1$subexpression$1"]},
    {"name": "ImportDecl$ebnf$1", "symbols": ["ImportDecl$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "ImportDecl$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "ImportDecl", "symbols": ["ImportDecl$ebnf$1", {"literal":"import"}, "ImportItemGroup"], "postprocess": 
        ([_from, _import, items]) => {
        	return {
        		src: _from,
        		items: items
        	};
        }
        },
    {"name": "ImportPath", "symbols": [(lexer.has("String") ? {type: "String"} : String)]},
    {"name": "ImportItemGroup$ebnf$1", "symbols": []},
    {"name": "ImportItemGroup$ebnf$1$subexpression$1", "symbols": [{"literal":","}, "ImportItem"]},
    {"name": "ImportItemGroup$ebnf$1", "symbols": ["ImportItemGroup$ebnf$1", "ImportItemGroup$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "ImportItemGroup", "symbols": ["ImportItem", "ImportItemGroup$ebnf$1"], "postprocess": 
        items => items[1].length > 0 ? [items[0], ...items[1].map(function(d:object[]){ return d[1]; })] : [items[0]]
        },
    {"name": "ImportItem$ebnf$1$subexpression$1", "symbols": [{"literal":"as"}, (lexer.has("Identifier") ? {type: "Identifier"} : Identifier)]},
    {"name": "ImportItem$ebnf$1", "symbols": ["ImportItem$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "ImportItem$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "ImportItem", "symbols": [(lexer.has("Identifier") ? {type: "Identifier"} : Identifier), "ImportItem$ebnf$1"], "postprocess": 
        items => {
        	return {
        		name: items[0],
        		rename_as: items[1] === null ? null : items[1][1]
        	};
        }
        },
    {"name": "Declaration", "symbols": ["VarDecl"]},
    {"name": "Declaration", "symbols": ["FuncDecl"]},
    {"name": "Declaration", "symbols": ["EnumDecl"]},
    {"name": "VarDecl", "symbols": [{"literal":"let"}, "VarNameList", {"literal":"="}, "ExprList"]},
    {"name": "FuncDecl$ebnf$1$subexpression$1", "symbols": [{"literal":":"}, "Type"]},
    {"name": "FuncDecl$ebnf$1", "symbols": ["FuncDecl$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "FuncDecl$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "FuncDecl", "symbols": [{"literal":"func"}, (lexer.has("Identifier") ? {type: "Identifier"} : Identifier), {"literal":"("}, "VarNameList", {"literal":")"}, "FuncDecl$ebnf$1", "BlockExpr"]},
    {"name": "EnumDecl$ebnf$1", "symbols": []},
    {"name": "EnumDecl$ebnf$1$subexpression$1", "symbols": [{"literal":","}, "EnumItem"]},
    {"name": "EnumDecl$ebnf$1", "symbols": ["EnumDecl$ebnf$1", "EnumDecl$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "EnumDecl", "symbols": [{"literal":"enum"}, (lexer.has("Identifier") ? {type: "Identifier"} : Identifier), {"literal":"{"}, "EnumItem", "EnumDecl$ebnf$1", {"literal":"}"}]},
    {"name": "EnumItem$ebnf$1$subexpression$1", "symbols": [{"literal":"="}, "Literal"]},
    {"name": "EnumItem$ebnf$1", "symbols": ["EnumItem$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "EnumItem$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "EnumItem", "symbols": [(lexer.has("Identifier") ? {type: "Identifier"} : Identifier), "EnumItem$ebnf$1"]},
    {"name": "Statement", "symbols": ["UnaryStmt"]},
    {"name": "Statement", "symbols": ["AssignStmt"]},
    {"name": "Statement", "symbols": ["IfStmt"]},
    {"name": "Statement", "symbols": ["ContinueStmt"]},
    {"name": "Statement", "symbols": ["BreakStmt"]},
    {"name": "Statement", "symbols": ["ReturnStmt"]},
    {"name": "UnaryStmt$subexpression$1", "symbols": ["NameRef"]},
    {"name": "UnaryStmt$subexpression$1", "symbols": ["IndexingExpr"]},
    {"name": "UnaryStmt", "symbols": ["UnaryStmt$subexpression$1", {"literal":"++"}]},
    {"name": "UnaryStmt$subexpression$2", "symbols": ["NameRef"]},
    {"name": "UnaryStmt$subexpression$2", "symbols": ["IndexingExpr"]},
    {"name": "UnaryStmt", "symbols": ["UnaryStmt$subexpression$2", {"literal":"--"}]},
    {"name": "AssignStmt", "symbols": ["VarNameList", {"literal":"="}, "ExprList"]},
    {"name": "AssignStmt", "symbols": ["VarNameList", {"literal":"+="}, "ExprList"]},
    {"name": "AssignStmt", "symbols": ["VarNameList", {"literal":"-="}, "ExprList"]},
    {"name": "AssignStmt", "symbols": ["VarNameList", {"literal":"*="}, "ExprList"]},
    {"name": "AssignStmt", "symbols": ["VarNameList", {"literal":"/="}, "ExprList"]},
    {"name": "AssignStmt", "symbols": ["VarNameList", {"literal":"%="}, "ExprList"]},
    {"name": "AssignStmt", "symbols": ["VarNameList", {"literal":"<<="}, "ExprList"]},
    {"name": "AssignStmt", "symbols": ["VarNameList", {"literal":">>="}, "ExprList"]},
    {"name": "AssignStmt", "symbols": ["VarNameList", {"literal":"|="}, "ExprList"]},
    {"name": "AssignStmt", "symbols": ["VarNameList", {"literal":"&="}, "ExprList"]},
    {"name": "AssignStmt", "symbols": ["VarNameList", {"literal":"^="}, "ExprList"]},
    {"name": "IfStmt$ebnf$1", "symbols": ["ElifStmt"], "postprocess": id},
    {"name": "IfStmt$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "IfStmt", "symbols": [{"literal":"if"}, "Expression", "BlockExpr", "IfStmt$ebnf$1"]},
    {"name": "ElifStmt$ebnf$1", "symbols": ["ElifStmt"], "postprocess": id},
    {"name": "ElifStmt$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "ElifStmt", "symbols": [{"literal":"elif"}, "Expression", "BlockExpr", "ElifStmt$ebnf$1"]},
    {"name": "ContinueStmt", "symbols": [{"literal":"continue"}]},
    {"name": "BreakStmt", "symbols": [{"literal":"break"}]},
    {"name": "ReturnStmt$ebnf$1", "symbols": ["Expression"], "postprocess": id},
    {"name": "ReturnStmt$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "ReturnStmt", "symbols": [{"literal":"return"}, "ReturnStmt$ebnf$1"]},
    {"name": "Expression", "symbols": [{"literal":"("}, "Expression", {"literal":")"}], "postprocess": tokens => tokens[1]},
    {"name": "Expression", "symbols": ["BinOpExpr"]},
    {"name": "Expression", "symbols": ["BoolOpExpr"]},
    {"name": "Expression", "symbols": ["CompareExpr"]},
    {"name": "Expression", "symbols": ["TupleExpr"]},
    {"name": "Expression", "symbols": ["ArrayExpr"]},
    {"name": "Expression", "symbols": ["BlockExpr"]},
    {"name": "Expression", "symbols": ["IndexingExpr"]},
    {"name": "Expression", "symbols": ["FunctionCallExpr"]},
    {"name": "Expression", "symbols": ["RangeExpr"]},
    {"name": "Expression", "symbols": ["NameRef"]},
    {"name": "TernaryExpr", "symbols": ["Expression", {"literal":"?"}, "Expression", {"literal":":"}, "Expression"]},
    {"name": "FunctionCallExpr$ebnf$1", "symbols": ["ExprList"], "postprocess": id},
    {"name": "FunctionCallExpr$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "FunctionCallExpr$ebnf$2", "symbols": []},
    {"name": "FunctionCallExpr$ebnf$2$subexpression$1", "symbols": [{"literal":"."}, "FunctionCallExpr"]},
    {"name": "FunctionCallExpr$ebnf$2", "symbols": ["FunctionCallExpr$ebnf$2", "FunctionCallExpr$ebnf$2$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "FunctionCallExpr", "symbols": ["Expression", {"literal":"("}, "FunctionCallExpr$ebnf$1", {"literal":")"}, "FunctionCallExpr$ebnf$2"]},
    {"name": "BlockExpr$ebnf$1", "symbols": []},
    {"name": "BlockExpr$ebnf$1$subexpression$1$ebnf$1", "symbols": ["LineEnd"]},
    {"name": "BlockExpr$ebnf$1$subexpression$1$ebnf$1", "symbols": ["BlockExpr$ebnf$1$subexpression$1$ebnf$1", "LineEnd"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "BlockExpr$ebnf$1$subexpression$1", "symbols": ["Statement", "BlockExpr$ebnf$1$subexpression$1$ebnf$1"]},
    {"name": "BlockExpr$ebnf$1", "symbols": ["BlockExpr$ebnf$1", "BlockExpr$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "BlockExpr", "symbols": [{"literal":"{"}, "BlockExpr$ebnf$1", {"literal":"}"}]},
    {"name": "BinOpExpr", "symbols": ["BinOr"]},
    {"name": "BinOr", "symbols": ["BinXor"]},
    {"name": "BinOr", "symbols": ["BinOr", {"literal":"|"}, "BinXor"]},
    {"name": "BinXor", "symbols": ["BinAnd"]},
    {"name": "BinXor", "symbols": ["BinXor", {"literal":"^"}, "BinAnd"]},
    {"name": "BinAnd", "symbols": ["BinShift"]},
    {"name": "BinAnd", "symbols": ["BinAnd", {"literal":"&"}, "BinShift"]},
    {"name": "BinShift", "symbols": ["BinAddSub"]},
    {"name": "BinShift", "symbols": ["BinShift", {"literal":"<<"}, "BinAddSub"]},
    {"name": "BinShift", "symbols": ["BinShift", {"literal":">>"}, "BinAddSub"]},
    {"name": "BinAddSub", "symbols": ["BinMulDiv"]},
    {"name": "BinAddSub", "symbols": ["BinAddSub", {"literal":"-"}, "BinMulDiv"]},
    {"name": "BinAddSub", "symbols": ["BinAddSub", {"literal":"+"}, "BinMulDiv"]},
    {"name": "BinMulDiv", "symbols": ["BinUnary"]},
    {"name": "BinMulDiv", "symbols": ["BinMulDiv", {"literal":"*"}, "BinUnary"]},
    {"name": "BinMulDiv", "symbols": ["BinMulDiv", {"literal":"/"}, "BinUnary"]},
    {"name": "BinMulDiv", "symbols": ["BinMulDiv", {"literal":"%"}, "BinUnary"]},
    {"name": "BinUnary", "symbols": ["Literal"]},
    {"name": "BinUnary", "symbols": [{"literal":"!"}, "Literal"]},
    {"name": "BinUnary", "symbols": [{"literal":"-"}, "Literal"]},
    {"name": "BoolOpExpr", "symbols": ["BoolOr"]},
    {"name": "BoolOr", "symbols": ["BoolXor"]},
    {"name": "BoolOr", "symbols": ["BoolOr", {"literal":"or"}, "BoolXor"]},
    {"name": "BoolXor", "symbols": ["BoolAnd"]},
    {"name": "BoolXor", "symbols": ["BoolXor", {"literal":"xor"}, "BoolAnd"]},
    {"name": "BoolAnd", "symbols": ["BoolNot"]},
    {"name": "BoolAnd", "symbols": ["BoolAnd", {"literal":"and"}, "BoolNot"]},
    {"name": "BoolNot$ebnf$1", "symbols": [{"literal":"not"}], "postprocess": id},
    {"name": "BoolNot$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "BoolNot", "symbols": ["BoolNot$ebnf$1", "CompareExpr"]},
    {"name": "CompareExpr", "symbols": ["Expression", {"literal":"=="}, "Expression"]},
    {"name": "CompareExpr", "symbols": ["Expression", {"literal":"!="}, "Expression"]},
    {"name": "CompareExpr$ebnf$1", "symbols": [{"literal":"not"}], "postprocess": id},
    {"name": "CompareExpr$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "CompareExpr", "symbols": ["Expression", "CompareExpr$ebnf$1", {"literal":"in"}, "Expression"]},
    {"name": "CompareExpr$ebnf$2$subexpression$1$subexpression$1", "symbols": [{"literal":"<"}]},
    {"name": "CompareExpr$ebnf$2$subexpression$1$subexpression$1", "symbols": [{"literal":">"}]},
    {"name": "CompareExpr$ebnf$2$subexpression$1$subexpression$1", "symbols": [{"literal":"<="}]},
    {"name": "CompareExpr$ebnf$2$subexpression$1$subexpression$1", "symbols": [{"literal":">="}]},
    {"name": "CompareExpr$ebnf$2$subexpression$1", "symbols": ["CompareExpr$ebnf$2$subexpression$1$subexpression$1", "Expression"]},
    {"name": "CompareExpr$ebnf$2", "symbols": ["CompareExpr$ebnf$2$subexpression$1"]},
    {"name": "CompareExpr$ebnf$2$subexpression$2$subexpression$1", "symbols": [{"literal":"<"}]},
    {"name": "CompareExpr$ebnf$2$subexpression$2$subexpression$1", "symbols": [{"literal":">"}]},
    {"name": "CompareExpr$ebnf$2$subexpression$2$subexpression$1", "symbols": [{"literal":"<="}]},
    {"name": "CompareExpr$ebnf$2$subexpression$2$subexpression$1", "symbols": [{"literal":">="}]},
    {"name": "CompareExpr$ebnf$2$subexpression$2", "symbols": ["CompareExpr$ebnf$2$subexpression$2$subexpression$1", "Expression"]},
    {"name": "CompareExpr$ebnf$2", "symbols": ["CompareExpr$ebnf$2", "CompareExpr$ebnf$2$subexpression$2"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "CompareExpr", "symbols": ["Expression", "CompareExpr$ebnf$2"]},
    {"name": "Literal", "symbols": [(lexer.has("DecLiteral") ? {type: "DecLiteral"} : DecLiteral)]},
    {"name": "Literal", "symbols": [(lexer.has("BinLiteral") ? {type: "BinLiteral"} : BinLiteral)]},
    {"name": "Literal", "symbols": [(lexer.has("HexLiteral") ? {type: "HexLiteral"} : HexLiteral)]},
    {"name": "Literal", "symbols": [(lexer.has("TrueLiteral") ? {type: "TrueLiteral"} : TrueLiteral)]},
    {"name": "Literal", "symbols": [(lexer.has("FalseLiteral") ? {type: "FalseLiteral"} : FalseLiteral)]},
    {"name": "Literal", "symbols": [(lexer.has("FloatLiteral") ? {type: "FloatLiteral"} : FloatLiteral)]},
    {"name": "Literal", "symbols": [(lexer.has("SciNotationLiteral") ? {type: "SciNotationLiteral"} : SciNotationLiteral)]},
    {"name": "Literal", "symbols": [(lexer.has("StringWithoutEsc") ? {type: "StringWithoutEsc"} : StringWithoutEsc)]},
    {"name": "Literal", "symbols": [(lexer.has("Character") ? {type: "Character"} : Character)]},
    {"name": "RangeExpr$ebnf$1", "symbols": ["Expression"], "postprocess": id},
    {"name": "RangeExpr$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "RangeExpr$ebnf$2", "symbols": ["Expression"], "postprocess": id},
    {"name": "RangeExpr$ebnf$2", "symbols": [], "postprocess": () => null},
    {"name": "RangeExpr$ebnf$3$subexpression$1", "symbols": [{"literal":":"}, "Expression"]},
    {"name": "RangeExpr$ebnf$3", "symbols": ["RangeExpr$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "RangeExpr$ebnf$3", "symbols": [], "postprocess": () => null},
    {"name": "RangeExpr", "symbols": ["RangeExpr$ebnf$1", {"literal":":"}, "RangeExpr$ebnf$2", "RangeExpr$ebnf$3"]},
    {"name": "TupleExpr$ebnf$1$subexpression$1", "symbols": ["Expression", {"literal":","}]},
    {"name": "TupleExpr$ebnf$1", "symbols": ["TupleExpr$ebnf$1$subexpression$1"]},
    {"name": "TupleExpr$ebnf$1$subexpression$2", "symbols": ["Expression", {"literal":","}]},
    {"name": "TupleExpr$ebnf$1", "symbols": ["TupleExpr$ebnf$1", "TupleExpr$ebnf$1$subexpression$2"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "TupleExpr$ebnf$2", "symbols": ["Expression"], "postprocess": id},
    {"name": "TupleExpr$ebnf$2", "symbols": [], "postprocess": () => null},
    {"name": "TupleExpr", "symbols": [{"literal":"("}, "TupleExpr$ebnf$1", "TupleExpr$ebnf$2", {"literal":")"}]},
    {"name": "ArrayExpr$ebnf$1", "symbols": ["Expression"], "postprocess": id},
    {"name": "ArrayExpr$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "ArrayExpr$ebnf$2", "symbols": []},
    {"name": "ArrayExpr$ebnf$2$subexpression$1", "symbols": [{"literal":","}, "Expression"]},
    {"name": "ArrayExpr$ebnf$2", "symbols": ["ArrayExpr$ebnf$2", "ArrayExpr$ebnf$2$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "ArrayExpr", "symbols": [{"literal":"["}, "ArrayExpr$ebnf$1", "ArrayExpr$ebnf$2", {"literal":"]"}]},
    {"name": "IndexingExpr", "symbols": ["Expression", {"literal":"["}, "Expression", {"literal":"]"}]},
    {"name": "ExprList$ebnf$1", "symbols": []},
    {"name": "ExprList$ebnf$1$subexpression$1", "symbols": [{"literal":","}, "Expression"]},
    {"name": "ExprList$ebnf$1", "symbols": ["ExprList$ebnf$1", "ExprList$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "ExprList", "symbols": ["Expression", "ExprList$ebnf$1"]},
    {"name": "VarNameList$ebnf$1", "symbols": []},
    {"name": "VarNameList$ebnf$1$subexpression$1", "symbols": [{"literal":","}, "VarName"]},
    {"name": "VarNameList$ebnf$1", "symbols": ["VarNameList$ebnf$1", "VarNameList$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "VarNameList", "symbols": ["VarName", "VarNameList$ebnf$1"]},
    {"name": "VarName$ebnf$1$subexpression$1", "symbols": [{"literal":":"}, "Type"]},
    {"name": "VarName$ebnf$1", "symbols": ["VarName$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "VarName$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "VarName", "symbols": [(lexer.has("Identifier") ? {type: "Identifier"} : Identifier), "VarName$ebnf$1"]},
    {"name": "Type$ebnf$1", "symbols": []},
    {"name": "Type$ebnf$1$subexpression$1", "symbols": [{"literal":"|"}, "_PrimitiveTypes"]},
    {"name": "Type$ebnf$1", "symbols": ["Type$ebnf$1", "Type$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Type", "symbols": ["_PrimitiveTypes", "Type$ebnf$1"]},
    {"name": "_PrimitiveTypes", "symbols": ["NameRef"]},
    {"name": "_PrimitiveTypes", "symbols": ["NameRef", {"literal":"*"}]},
    {"name": "_PrimitiveTypes", "symbols": ["NameRef", {"literal":"[]"}]},
    {"name": "_PrimitiveTypes$ebnf$1$subexpression$1", "symbols": ["NameRef", {"literal":","}]},
    {"name": "_PrimitiveTypes$ebnf$1", "symbols": ["_PrimitiveTypes$ebnf$1$subexpression$1"]},
    {"name": "_PrimitiveTypes$ebnf$1$subexpression$2", "symbols": ["NameRef", {"literal":","}]},
    {"name": "_PrimitiveTypes$ebnf$1", "symbols": ["_PrimitiveTypes$ebnf$1", "_PrimitiveTypes$ebnf$1$subexpression$2"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "_PrimitiveTypes$ebnf$2", "symbols": ["NameRef"], "postprocess": id},
    {"name": "_PrimitiveTypes$ebnf$2", "symbols": [], "postprocess": () => null},
    {"name": "_PrimitiveTypes", "symbols": [{"literal":"("}, "_PrimitiveTypes$ebnf$1", "_PrimitiveTypes$ebnf$2", {"literal":")"}]},
    {"name": "NameRef$subexpression$1", "symbols": [{"literal":"."}, (lexer.has("Identifier") ? {type: "Identifier"} : Identifier)]},
    {"name": "NameRef", "symbols": [(lexer.has("Identifier") ? {type: "Identifier"} : Identifier), "NameRef$subexpression$1"]},
    {"name": "LineEnd", "symbols": [(lexer.has("Comment") ? {type: "Comment"} : Comment)]},
    {"name": "LineEnd", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": id}
  ],
  ParserStart: "Program",
};

export default grammar;
