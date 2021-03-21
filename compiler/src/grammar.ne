@preprocessor typescript
@{%
// issue: https://github.com/kach/nearley/issues/527#issuecomment-734847077
import { default as lexer_moo} from "./lexer";
const lexer = (lexer_moo as unknown) as NearleyLexer;

import {ParserState} from "./parser";

import {File} from "./ast";

import {
	// TODO: Add all AST nodes here
} from "./ast/nodes";

%}

@lexer lexer
#
#   Starting point
#
Program -> LineEnd:* (ImportDecl LineEnd:+):* (Statement LineEnd:+):*
{%
	([nl, imports, stmts]) => {
		return new ParserState(
			imports.map(function(d:object[]){ return d[0]; }).flat(Infinity),
			stmts.map(function(d:object[]){ return d[0]; }),
		);
	}
%}

# Import
ImportDecl -> ("from" (ImportPath | NameRef)):? "import" ImportItemGroup
{%
	([_from, _import, items]) => {
		return {
			src: _from, 
			items: items
		};
	}
%}

ImportPath -> %StringWithoutEsc

ImportItemGroup -> ImportItem ("," ImportItem):* 
{%
	items => items[1].length > 0 ? [items[0], ...items[1].map(function(d:object[]){ return d[1]; })] : [items[0]]
%}

ImportItem -> %Identifier ("as" %Identifier):?
{% 
	items => {
		return {
			name: items[0], 
			rename_as: items[1] === null ? null : items[1][1]
		};
	}
%}

#
#   Declarations
#
Declaration -> VarDecl
		| FuncDecl
		| EnumDecl
		# | StructDecl

VarDecl -> "let" VarNameList "=" ExprList

FuncDecl -> "func" %Identifier "(" VarNameList ")" (":" Type):? BlockExpr

EnumDecl -> "enum" %Identifier "{" EnumItem ("," EnumItem):* "}"

EnumItem -> %Identifier ("=" Literal):?

# StructDecl -> "struct"

#
#   Statements
#
Statement -> UnaryStmt
		| AssignStmt
		| IfStmt
		| ContinueStmt
		| BreakStmt
		| ReturnStmt

UnaryStmt -> (NameRef | IndexingExpr) "++" 
		| (NameRef | IndexingExpr) "--"

AssignStmt -> VarNameList "=" ExprList
		| VarNameList "+=" ExprList
		| VarNameList "-=" ExprList
		| VarNameList "*=" ExprList
		| VarNameList "/=" ExprList
		| VarNameList "%=" ExprList
		| VarNameList "<<=" ExprList
		| VarNameList ">>=" ExprList
		| VarNameList "|=" ExprList
		| VarNameList "&=" ExprList
		| VarNameList "^=" ExprList

IfStmt -> "if" Expression BlockExpr ElifStmt:?

ElifStmt -> "elif" Expression BlockExpr ElifStmt:?

ContinueStmt -> "continue" 

BreakStmt -> "break"

ReturnStmt -> "return" Expression:? 

#
#   Expressions
#
Expression -> "(" Expression ")" {% tokens => tokens[1] %}
		| BinOpExpr
		| BoolOpExpr
		| CompareExpr
		| TupleExpr
		| ArrayExpr
		| BlockExpr
		| IndexingExpr
		| FunctionCallExpr
		| RangeExpr
		| NameRef

TernaryExpr ->  Expression "?" Expression ":" Expression

FunctionCallExpr -> Expression "(" ExprList:? ")" ("." FunctionCallExpr):*

BlockExpr -> "{" (Statement LineEnd:+):* "}"

BinOpExpr -> BinOr

BinOr -> BinXor
		| BinOr "|" BinXor 

BinXor -> BinAnd
		| BinXor "^" BinAnd 

BinAnd -> BinShift
		| BinAnd "&" BinShift 

BinShift -> BinAddSub
		| BinShift "<<" BinAddSub
		| BinShift ">>" BinAddSub

BinAddSub -> BinMulDiv
		| BinAddSub "-" BinMulDiv 
		| BinAddSub "+" BinMulDiv

BinMulDiv -> BinUnary
		| BinMulDiv "*" BinUnary 
		| BinMulDiv "/" BinUnary 
		| BinMulDiv "%" BinUnary 

BinUnary -> Literal
		| "!" Literal 
		| "-" Literal 

BoolOpExpr -> BoolOr

BoolOr -> BoolXor
		| BoolOr "or" BoolXor 

BoolXor -> BoolAnd
		| BoolXor "xor" BoolAnd 

BoolAnd -> BoolNot
		| BoolAnd "and" BoolNot 

BoolNot -> "not":? CompareExpr

CompareExpr -> Expression "==" Expression 
		| Expression "!=" Expression 
		| Expression "not":? "in" Expression
		| Expression (("<" | ">" | "<=" | ">=") Expression):+

Literal -> %DecLiteral
		| %BinLiteral
		| %HexLiteral
		| %TrueLiteral
		| %FalseLiteral
		| %FloatLiteral
		| %SciNotationLiteral
		| %StringWithoutEsc
		| %Character

RangeExpr -> Expression:? ":" Expression:? (":" Expression):?

TupleExpr -> "(" (Expression ","):+ Expression:? ")"

ArrayExpr -> "[" Expression:? ("," Expression):* "]"

IndexingExpr -> Expression "[" Expression "]"

#
#   Misc.
#
ExprList -> Expression ("," Expression):*

VarNameList -> VarName ("," VarName):*

VarName -> %Identifier (":" Type):?

Type -> NameRef
	| NameRef "*"
	| NameRef "[]"
	| "(" (NameRef ","):+ NameRef:? ")"

NameRef -> Name ("." Name)

Name -> "@":? %Identifier

LineEnd -> %SLC | %MLC | %NL
{%
	([item]) => item
%}