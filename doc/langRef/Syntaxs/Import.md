# Import

```
ImportDecl -> ImportFrom:? "import" ImportItemList

ImportFrom -> "from" (ImportPath | NameRef)

ImportItemList -> ImportItem ("," ImportItem):*

ImportItem -> %Identifier ("as" %Identifier):?

ImportPath -> %
```

## Import from scope

```

```

## Import from path

```

```

## Import from git repository

```

```