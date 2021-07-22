import { expect } from "chai";
import { Chance } from "chance";
const chance = new Chance();

import { RESERVED_WORDS } from "../parsing/lexer-moo";
import lexer from "../parsing/lexer-moo";
import { Token } from "moo";

// number of tries for random input
const RANDOM_N = 10000;

describe('Lexer', () => {
    function checkToken(token: Token | undefined, expect_type: string, expect_value: string){
        expect(token, 'token not defined').to.exist;
        expect(token?.type, `Lexer should returns ${expect_type} token not ${token?.type}.`).to.equal(expect_type);
        expect(token?.value, `Attribute value expected to be ${expect_value} not ${token?.value}.`).to.equal(expect_value);
    }

    it('Primitive types', () => {
        RESERVED_WORDS.PrimitiveType.forEach(c => {
            lexer.reset(c);
            checkToken(lexer.next(), 'PrimitiveType', c);
        });
    });

    it('Reserved words', () => {
        RESERVED_WORDS.ReservedWord.forEach(c => {
            lexer.reset(c);
            checkToken(lexer.next(), 'ReservedWord', c);
        });
    });

    //TODO: Test Symbols

    it('Comments', () => {
        for(let i = 0; i < RANDOM_N; i++){
            let sentence = chance.string();
            lexer.reset('#' + sentence);
            checkToken(lexer.next(), 'Comment', sentence.trimStart().trimEnd());
        }
    });

    /**
     * Test Literals
     */
    describe('Literals', () => {
        it('Characters', () => {
            for (let i = 0; i < RANDOM_N; i++) {
                const c = chance.character();
                lexer.reset('\'' + c + '\'');
                checkToken(lexer.next(), 'Character', c);
            }
        });

        it('String without escape characters', () => {
            for (let i = 0; i < RANDOM_N; i++) {
                const c = chance.string();
                lexer.reset('"' + c + '"');
                checkToken(lexer.next(), 'String', c);
            }
        });

        it('String with escape characters', () => {
            //TODO: Add invalid escape character to the test
            for (let i = 0; i < RANDOM_N; i++) {
                let c = `${chance.string()}\\${chance.character({pool: '\\tnr0'})}${chance.string()}`;
                lexer.reset('"' + c + '"');
                checkToken(lexer.next(), 'String', c);
            }
        });

        it('Decimal numbers', () => {
            for (let i = 0; i < RANDOM_N; i++){
                let c = `${chance.integer({min: 0})}`;
                lexer.reset(c);
                checkToken(lexer.next(), 'DecLiteral', c);
            }
        });

        it('Hexadecimal numbers', () => {
            for (let i = 0; i < RANDOM_N; i++){
                let c = `${chance.string({pool: '0123456789abcdefABCDEF_'})}${chance.character({pool: '0123456789abcdefABCDEF'})}`;
                lexer.reset('0x' + c);
                // remove all underscores as lexer suppose do
                c = c.replace('_', '');
                checkToken(lexer.next(), 'HexLiteral', c);
            }
        });

        it('Binary numbers', () => {
            for (let i = 0; i < RANDOM_N; i++){
                let c = `${chance.character({pool: '01'})}${chance.string({pool: '01_'})}${chance.character({pool: '01'})}`;
                lexer.reset('0b' + c);
                // remove all underscores as lexer suppose do
                c = c.replace('_', '');
                checkToken(lexer.next(), 'BinLiteral', c);
            }
        });

        it('Floating points', () => {
            for (let i = 0; i < RANDOM_N; i++){
                let c = `${chance.integer({min: 0})}.${chance.integer({min: 0})}`;
                lexer.reset(c);
                checkToken(lexer.next(), 'FloatLiteral', c);
            }
        });

        it('Scientific notations', () => {
            for (let i = 0; i < RANDOM_N; i++){
                let c = `${chance.floating({min: 0})}${chance.character({pool: 'eE'})}${chance.integer()}`;
                lexer.reset(c);
                checkToken(lexer.next(), 'SciNotationLiteral', c.toLowerCase());
            }
        });
    });
});