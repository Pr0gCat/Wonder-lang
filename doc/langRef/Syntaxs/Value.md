

```
NameRef -> %Identifier ("." %Identifier):*

ValueRef -> NameRef
        | Boolean
        | Literal

Literal -> IntegerLiteral
		| TextLiteral
		| %FloatLiteral
		| %SciNotationLiteral
		

IntegerLiteral -> %DecLiteral
        | %BinLiteral
		| %HexLiteral

TextLiteral -> %String | %Character
```