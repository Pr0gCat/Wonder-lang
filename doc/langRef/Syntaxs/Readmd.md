# Syntaxs

All syntax will be described in nearley's EBNF.

## Program

```
Program -> LineEnd:* (ImportStmt LineEnd:+):* (Statement LineEnd:+):*
```

In order to make sure user won't write their import statement everywhere, we force you to write all imports at the start of the file.