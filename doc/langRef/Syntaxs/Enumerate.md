# Enumerate

```
EnumDecl -> "enum" %Identifier "{" EnumItemList "}"

EnumItemList -> EnumItem ("," EnumList):*

EnumItem -> %Identifier ("=" Literal):?
```