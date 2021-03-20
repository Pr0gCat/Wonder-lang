# The Wonder-lang Programmign Language Specification

All syntax is written in Nearley with EBNF style.

## Tokens and Reserved Words

**Tokens**
|Token|Description|Regrex|
|-|-|-|
|%NL|NewLine|`\r\n\|\n`|
|%Identifier|Identifier|`[_a-zA-Z][\w]*`|
|%DecLiteral|Decimal Number|`0\|[0-9]\d+`|
|%HexLiteral|Hexadecimal Number|`0x[0-9a-fA-F]+`|
|%BinLiteral|Binary number|`[10_]+b`|
|%FloatLiteral|Floating point|`(?:0\|[0-9]\d+)?\.\d+`|
|%SciNotationLiteral|Scientific Notation|`(?:${float_regex})[eE][-]?\\d+`|
|%Character|Character|`'.+'`|
|%NoEscapeString|String without escape characters|`"(?:\\["\\]\|[^\n"\\])*"`|
|%String|Text|`[a-z]?"(?:\\["\\a-z]\|[^\n"\\])*"`|

<br>

**Reserved Words**

<table>
    <tr>
        <td>import</td>
        <td>from</td>
        <td>as</td>
        <td>enum</td>
        <td>struct</td>
    </tr>
    <tr>
        <td>func</td>
        <td>let</td>
        <td>continue</td>
        <td>break</td>
        <td>return</td>
    </tr>
    <tr>
        <td>if</td>
        <td>else</td>
        <td>elif</td>
        <td>match</td>
        <td>or</td>
    </tr>
    <tr>
        <td>xor</td>
        <td>and</td>
        <td>not</td>
        <td>true</td>
        <td>false</td>
    </tr>
    <tr>
        <td>in</td>
        <td>none</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>

---

## Syntax Overview
```
File -> %NL:* (ImportStmt %NL:+):* (Item %NL:+):*

Item -> Statement
    | Declaration
    | NoReturnBlock
```

### Namespaces and program architecture

Basically, namespaces in Wonder-lang are based on file structure.

Wonder-lang treats each source file as an individual namespace named after its filename without extensions. For instance, `example.ac` will be identify as a namespace called `example`, same thing happens on the directories with Wonder-lang source file(s), the directory itself will seen as a namespace named after the directory name.

Different from other programming languages, Wonder-lang did not support defining namespaces with code.The reason behind it is quite simple, I think different namespaces in a single file will soon making maintenance difficult. In generally, namespaces are used to seprate similar functionalities and I think there's no reason to write defining multiple namespaces in a single file beside poor file management.

Wonder-lang's program architecture are simple, everything start from a package, a folder with package configuration and a entry point file, the package configuration contains infomation about the package and the entry point file act like the glue for the package, linking functionalities together, entry point in Wonder-lang is a huge topic which deserve a whole section.

A Wonder-lang source file was seprated in 2 sections, the Import Section and the Context Section.
The Import Section holds all the import statements and should be placed before Context Section,
On the other hand, Context Section holds all the declarations and statements.

---

## Supporting Syntax

```
NameList -> NameRef ("," NameRef):+

ExprList -> Expression ("," Expression):+

ParamList -> ParameterDecl ("," ParameterDecl):+

NameRef -> "@":? %Identifier ("." %Identifier):*
```

---

## Statements

```
Statement -> AssignStmt
            | FuncCall
            | NoReturnBlock
            | Declaration
            | Increase
            | Decrease
```

### Assignations

```
AssignStmt -> NameList "=" Expression
		| NameList "+=" Expression
		| NameList "-=" Expression
		| NameList "*=" Expression
		| NameList "/=" Expression
		| NameList "%=" Expression
		| NameList "<<=" Expression
		| NameList ">>=" Expression
		| NameList "|=" Expression
		| NameList "&=" Expression
		| NameList "^=" Expression
```

### Increasement and Decreasement

```
Increase -> NameRef "++"

Decrease -> NameRef "--"
```

---

## Declarations

```
Declaration -> VarDecl
            | FuncDecl
            | EnumDecl
            | StructDecl
```

### Variable Declaration

```
VarDecl -> "let" NameList "=" ExprList
```

### Function Declaration

```
FuncDecl -> "func"
```

### Enumerate Declaration

### Structure Declaration

---

## Expressions

```
Expression -> "(" Expression ")"
        | Literal
        | ArrayExpr
        | FuncCall
        | ArraySlicing
```

### Literals

```
Literal -> %DecLiteral
    | %BinLiteral
    | %HexLiteral
    | %FloatLiteral
    | %SciNotationLiteral
    | "true"
    | "false"
    | %Character
    | %String
```

### Tuple

```
TupleDef -> "(" (TupleMember ","):+ TupleMember:? ")"

TupleMember -> (%Identifier "="):? Expression

TupleType -> "(" (NameRef ","):+ NameRef:? ")"
```

#### Referencing

### Array

```
ArrayDef -> "[" ArrayElement:? ("," ArrayElement):* "]"

ArrayElement -> Expression
            | "[" ExprList "]" ";" %DecLiteral
```

#### Referencing

#### Slicing

### Function Call

```
FuncCallExpr -> NameRef "(" ExprList ")" ("." %Identifier "(" ExprList ")"):*
```

### Pointer Reference and Dereference

### Arithmetic Operations

### Binary Operations

### Boolean Operations

### Expression precedence

The following table shows precedence of all expressions in decending order.

|Operator|Description|
|---|--|
| `(expression)` | Expression with parentheses |
| `!`, `-` | Binary Not, Negative |
|  | |

---

## Declarations

### Imports

### Variables

### Structures

### Enumerates

### Functions

## Special Identifiers