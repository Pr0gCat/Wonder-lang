# Function

```
# not done
FuncDecl -> Modifier:* "func" NameRef "(" (VarNameList | "..."):? ")" ":" VarNameList

FuncCall -> NameRef "(" ExprList:? ")"
```