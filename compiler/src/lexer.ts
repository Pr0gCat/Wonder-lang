/*
    lexer.ts - Tokenize code into Token stream.
*/
import * as moo from "moo";

let dec_regex = /0|[0-9]\d+/;
let float_regex = new RegExp(`(?:${dec_regex})?\.\\d+`);

const lexer = moo.compile({
    /* Reserved Words */
    Identifier: {match: /[_a-zA-Z][\w]*/, type: moo.keywords({
        ReservedWords: [
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
            'else',
            'elif',
            'match',
            'or',
            'xor',
            'and',
            'not',
            'true',
            'false',
        ]
    })},

    /* Symbols */
    '!': '!',
    '@': '@',
    '#': '#',
    '$': '$',
    '%': '%',
    '^': '^',
    '&': '&',
    '*': '*',
    '(': '(',
    ')': ')',
    '-': '-',
    '=': '=',
    '+': '+',
    '[': '[',
    ']': ']',
    '{': '{',
    '}': '}',
    '|': '|',
    ';': ';',
    ':': ':',
    '\'': '\'',
    '"': '"',
    ',': ',',
    '<': '<',
    '.': '.',
    '>': '>',
    '/': '/',
    '?': '?',

    /* Literals */
    Character: /'.+'/,
    NoEscapeString: /"(?:\\["\\]|[^\n"\\])*"/,
    String: /[a-z]?"(?:\\["\\a-z]|[^\n"\\])*"/,
    DecLiteral: dec_regex,
    HexLiteral: /0x[0-9a-fA-F]+/,
    BinLiteral: /[10_]+b/,
    FloatLiteral: float_regex,
    SciNotationLiteral: new RegExp(`(?:${float_regex})[eE][-]?\\d+`),

    /* Misc */
    /*
        TODO: Use markdown blockquote as multi-line comments
    */
    Comment: /\/\/.*/,
    // Markdown: 
    WS: /[ \t]+/,
    NL: { match: /\r\n|\n/, lineBreaks: true},
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