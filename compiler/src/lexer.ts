/*
    lexer_moo.ts - Tokenize text using Moo lexer.
*/
import * as moo from "moo";

export const RESERVED_WORDS = {
    PrimitiveType: [
        'str',
        'bool',
        'ptr',
        'u8',
        'u16',
        'u32',
        'u64',
        'i8',
        'i16',
        'i32',
        'i64',
    ],
    ReservedWord: [
        'import',
        'from',
        'as',
        'enum',
        'struct',
        'func',
        'let',
        'continue',
        'break',
        'return',
        'if',
        'elif',
        'match',
        'or',
        'xor',
        'and',
        'not',
        'true',
        'false',
        'in',
    ]
}

const lexer = moo.compile({
    /* Supportive Syntax */
    //TODO: Utilize Lexer State to make this happen
    // SS_Markdown: /\@md/,
    // SS_End: /\@end/,

    /* Reserved Words */
    Identifier: {match: /[_a-zA-Z][\w]*/, type: moo.keywords(RESERVED_WORDS)},

    /* Symbols */
    // TODO: refactor it
    Symbol: [
        // Operator
        '+', '-', '*', '/', '%', 
        '//', '**', '++', '--',
        '<<', '>>',
        '!', '|', '&', '^',

        // Assign
        '=', '+=', '-=', '*=', '/=', '%=', '<<=', '>>=',
        '|=', '&=', '^=',

        // Delimiter
        ',', '.', '?', ';', ':', 
        '~', '`', '(', ')', '[',
        ']', '{', '}', '$',

        // Comparison
        '==', '!=', '>', '>=', '<', '<='
    ],
    
    /* Literals */
    Character: {match: /'(?:.?|\\["'\\a-z])'/, value: s => s[1]},
    String: {match: /[a-z]?"(?:\\["\\tnr0]|[^\n"\\])*"/, value: s => s.slice(1, s.length-1)},
    // QuoteString: ,
    
    HexLiteral: {match: /0x[0-9a-fA-F_]*/, value: s => s.slice(2).replace('_', '')},
    BinLiteral: {match: /0b[10_]+/, value: s => s.slice(2).replace('_', '')},
    SciNotationLiteral: {match: /(?:\d*\.?\d+)[eE][-]?\d+/, value: s => s.toLowerCase()}, // lower 'E' to make parsing easier
    FloatLiteral: /\d*\.\d+/, // This rule must below SciNotationLiteral
    DecLiteral: /0|[0-9]\d+/, // This regex should always at the end of Literals rules

    /* Misc */
    Comment: {match: /\#.*/, value: s => s.slice(1).trimStart().trimEnd()}, // we dont want any spaces before or after the comment
    WS: /[ \t]+/,
    NL: { match: /\r\n|\n/, lineBreaks: true}
});

// Wrapping lexer so it will ignore whitespaces
// See https://github.com/no-context/moo/issues/81
lexer.next = (next => () => {
    let tok;
    while((tok = next.call(lexer)) && tok.type == 'WS') {}
    // yay! now we dont have to deal with WS in parser.
    return tok;
})(lexer.next);

export default lexer;