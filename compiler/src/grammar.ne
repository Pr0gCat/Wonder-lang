@preprocessor typescript
@{%
// issue: https://github.com/kach/nearley/issues/527#issuecomment-734847077
import { default as lexer_moo} from "./lexer";
const lexer = (lexer_moo as unknown) as NearleyLexer;

import * as nodes from "./ast/nodes";


%}

@lexer lexer
#
#   Starting point
#
Program -> %NL:* (ImportDecl %NL:+):* (Statement %NL:+):*
{%
	tokens => console.log(tokens);
%}

# Import
ImportDecl -> ("from" (ImportPath | NameRef)):? "import" ImportItemGroup
{%
	([from_part, _import, items]) => {
		console.log('from', from_part);
		console.log('items', items);
	}
%}

ImportPath -> %StringWithoutEsc {% id %}

ImportItemGroup -> ImportItem {% id %}
		| ImportItemGroup "," ImportItem
		{% ([gp, _, item]) => [...gp, item] %}

ImportItem -> %Identifier ("as" %Identifier):? {% id %}

#
#   Declarations
#
Declaration -> VarDecl
		| FuncDecl
		| EnumDecl
		| StructDecl

VarDecl -> "let" VarList "=" ExprList

FuncDecl -> "func" %Identifier "(" ParamList:? ")" BlockExpr

EnumDecl -> "enum" %Identifier "{" EnumItem ("," EnumItem):* "}"

EnumItem -> %Identifier ("=" Literal):?

StructDecl -> "struct"

#
#   Statements
#
Statement -> UnaryStmt
		| AssignStmt
		| IfStmt
		| ContinueStmt
		| BreakStmt
		| ReturnStmt

UnaryStmt -> NameRef "++" {% tokens => new nodes.IncStmt(tokens) %}
		| NameRef "--" {% tokens => new nodes.DecStmt(tokens) %}

AssignStmt -> NameRef "=" Expression
		| NameRef "+=" Expression
		| NameRef "-=" Expression
		| NameRef "*=" Expression
		| NameRef "/=" Expression
		| NameRef "%=" Expression
		| NameRef "<<=" Expression
		| NameRef ">>=" Expression
		| NameRef "|=" Expression
		| NameRef "&=" Expression
		| NameRef "^=" Expression

IfStmt -> "if" Expression BlockExpr (ElifStmt | ElseStmt):?

ElifStmt -> "elif" Expression BlockExpr (ElifStmt | ElseStmt):?

ElseStmt -> "else" BlockExpr

ContinueStmt -> "continue" {% [token] => new nodes.ContinueStmt(token) %}

BreakStmt -> "break" {% [token] => new nodes.BreakStmt(token) %}

ReturnStmt -> "return" Expression:? {% [ret, expr] => new nodes.ReturnStmt(ret, expr) %}

#
#   Expressions
#
Expression -> "(" Expression ")" {% tokens => tokens[1] %}
		| CompareExpr
		| BinOpExpr
		| BoolOpExpr
		| NameRef
		| BlockExpr
		| FunctionCallExpr

FunctionCallExpr -> NameRef "(" ExprList:? ")"

BlockExpr -> "{" (Statement %NL:+):* "}"

CompareExpr -> Expression "==" Expression {% [lhs, _, rhs] => new nodes.Equal(lhs, rhs) %}
		| Expression "!=" Expression {% [lhs, _, rhs] => new nodes.NotEqual(lhs, rhs) %}
		| Expression "<" Expression {% [lhs, _, rhs] => new nodes.Less(lhs, rhs) %}
		| Expression "<=" Expression {% [lhs, _, rhs] => new nodes.LessThan(lhs, rhs) %}
		| Expression ">" Expression {% [lhs, _, rhs] => new nodes.Greater(lhs, rhs) %}
		| Expression ">=" Expression {% [lhs, _, rhs] => new nodes.GreaterEqual(lhs, rhs) %}

BinOpExpr -> BinOr

BinOr -> BinXor
		| BinOr "|" BinXor {% [lhs, _, rhs] => new nodes.BinOr(lhs, rhs) %}

BinXor -> BinAnd
		| BinXor "^" BinAnd {% [lhs, _, rhs] => new nodes.BinXor(lhs, rhs) %}

BinAnd -> BinShift
		| BinAnd "&" BinShift {% [lhs, _, rhs] => new nodes.BinAnd(lhs, rhs) %}

BinShift -> BinAddSub
		| BinShift "<<" BinAddSub {% [lhs, _, rhs] => new nodes.Shl(lhs, rhs) %}
		| BinShift ">>" BinAddSub {% [lhs, _, rhs] => new nodes.Shr(lhs, rhs) %}

BinAddSub -> BinMulDiv
		| BinAddSub "-" BinMulDiv {% [lhs, _, rhs] => new nodes.Sub(lhs, rhs) %}
		| BinAddSub "+" BinMulDiv {% [lhs, _, rhs] => new nodes.Add(lhs, rhs) %}

BinMulDiv -> BinUnary
		| BinMulDiv "*" BinUnary {% [lhs, _, rhs] => new nodes.Mul(lhs, rhs) %}
		| BinMulDiv "/" BinUnary {% [lhs, _, rhs] => new nodes.Div(lhs, rhs) %}
		| BinMulDiv "%" BinUnary {% [lhs, _, rhs] => new nodes.Mod(lhs, rhs) %}

BinUnary -> Literal {% id %}
		| "!" Literal {% [sym, expr] => new nodes.BinNot(sym, expr) %}
		| "-" Literal {% [sym, expr] => new nodes.Neg(sym, expr) %}

BoolOpExpr -> BoolOr

BoolOr -> BoolXor
		| BoolOr "or" BoolXor {% [lhs, _, rhs] => new nodes.BoolOr(lhs, rhs) %}

BoolXor -> BoolAnd
		| BoolXor "xor" BoolAnd {% [lhs, _, rhs] => new nodes.BoolXor(lhs, rhs) %}

BoolAnd -> BoolNot
		| BoolAnd "and" BoolNot {% [lhs, _, rhs] => new nodes.BoolAnd(lhs, rhs) %}

BoolNot -> "not":? CompareExpr
{%
		[not, expr] => {
				console.log(not, expr);
		}
%}

Literal -> %DecLiteral {% [tok] => new nodes.Literal(tok) %}
		| %BinLiteral {% [tok] => new nodes.Literal(tok) %}
		| %HexLiteral {% [tok] => new nodes.Literal(tok) %}
		| %TrueLiteral {% [tok] => new nodes.Literal(tok) %}
		| %FalseLiteral {% [tok] => new nodes.Literal(tok) %}
		| %FloatLiteral {% [tok] => new nodes.Literal(tok) %}
		| %SciNotationLiteral {% [tok] => new nodes.Literal(tok) %}
		| %StringWithoutEsc {% [tok] => new nodes.Literal(tok) %}
		| %Character {% [] => new nodes.Literal(tok) %}

# Tuple
TupleDecl -> "(" (NameRef ","):+ NameRef:? ")"

TupleDef -> "(" (TupleMember ","):+ TupleMember:? ")"

TupleMember -> (%Identifier "="):? Expression

TupleType -> "(" (NameRef ","):+ NameRef:? ")"

# Array
ArrayDef -> "[" Expression:? ("," Expression):* "]"

ArraySlicing -> NameRef "[" %DecLiteral "]"

#
#   Misc.
#
VarList -> (NameRef, ","):* NameRef

ExprList -> Expression {% tokens => [tokens[0]] %}
		| ExprList "," Expression
		{% tokens => [...tokens[0], tokens[2]] %}

ParamList -> ParameterDecl {% tokens => [tokens[0]] %}
		| ParamList "," ParameterDecl
		{% tokens => [...tokens[0], tokens[2]] %}

NameRef -> %Identifier {% tokens => [tokens[0]] %}
		| NameRef "." %Identifier
		{% ([refs, _, name]) => [...refs, name] %}

ParameterDecl -> NameRef %Identifier {% [_type, name] => {} %}