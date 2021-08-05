# Variable

```
VarDecl -> "let" VarNameList "=" ExprList

VarNameList -> VarNameDecl ("," VarNameDecl):*

VarNameDecl -> %Identifier (":" NameRef):?
```