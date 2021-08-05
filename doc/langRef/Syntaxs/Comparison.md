# Comparison

```
CompareExpr -> Expression "==" Expression
        | Expression "!=" Expression
        | Expression "not":? "in" Expression
        | Expression (("<" | ">" | "<=" | ">=") Expression):+
```