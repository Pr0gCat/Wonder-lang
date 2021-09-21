# Language References

## Compilation

### Comment

````
// This is a single line comment
"""
This
is
not
only
a
multiline
comment
"""

```
# This is markdown comment

Can use for generate documentation, ofc you can manapulate with tools and code.

<!--Would like to see what if code editor render it-->
```
````



## Primitive Types

**Primitive Integer Types Overview**

| Signed | Unsigned | Width in bits | C's Equivalent    |
| ------ | -------- | ------------- | ----------------- |
| bit    | bit      | 1             | -                 |
| i8     | u8       | 8             | int8_t, uint8_t   |
| i16    | u16      | 16            | int16_t, uint16_t |
| i32    | u32      | 32            | int32_t,uint32_t  |
| i64    | u64      | 64            | int64_t, uint64_t |
| f32    | f32      | 32            | float             |
| f64    | f64      | 64            | double            |
|        |          |               |                   |

### With different numeral systems

```
// Decimal 
// regrex: 0|[1-9]\d+
1
123
54345

// Hexadecimal 
// regrex: 0x[0-9a-fA-F_]*
0x0
0x123
0x55AA
0xffffff
0x1_2_3_a_b_c

// Binary 
// regrex: 0b[10_]+
0b1
0b01011010
0b1111_0000_1111 // compiler will consider as u16

// Scientific notation
// regrex: (?:\d*\.?\d+)[eE][-]?\d+
1e1
1e-2
543.123531e-20

```

### Type Casting

```
//<type>(<thing to cast>)
i16(123) // 123 in 16 bits
u8(-123) // this will raise compile error, compiler expect you know nothing
u8?(-123) // this won't raise compile error, and it is 123 in 8bit
```



#### Primitive methods

```
//<type>.min
i8.min // -127
//<type.max>
u16.max // 65535
//<type.nbit>
i32.nbit // 32
```

### Boolean

### Character

###  String

###  Pointer

## Compound Types

### Enumerate

### Structure

## Variables and Functions

## Integer Arithmetic

## Boolean Arithmetic

## Import package

