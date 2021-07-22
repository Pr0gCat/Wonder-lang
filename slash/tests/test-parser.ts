import { expect } from "chai";

import {
    BuilderRule, ParseResult, 
    Rule, 
    ExpectType, 
    ExpectStr, 
    Not, 
    Optional,
    Any,
    Some,
    OneOf,
} from "../parsing/tree-builder";
import lexer from "../parsing/lexer";

describe('TreeBuilder', () => {
    function testRule(input: string, rule: BuilderRule, expect_success: boolean = true): ParseResult{
        lexer.reset(input);
        let res = rule(lexer);
        expect(res.success, `Rule expected to be ${expect_success}!`).equal(expect_success);
        if(expect_success) expect(res.content).exist;
        return res;
    }

    it('ExpectStr', () => {
        let res = testRule('abc', ExpectStr('abc'));
        expect(res.content).to.have.length(1);
    });

    it('ExpectType', () => {
        let res = testRule('abc', ExpectType('Identifier'));
        expect(res.content).to.have.length(1);
    });

    it('Rule', () => {
        let rule = Rule([ExpectStr('import'), ExpectType('Identifier')], (_import, _ident) => {
            return {success: true, content: [_import, _ident]};
        })
        // false case
        testRule('abc defg', rule, false);
        // true case
        let res = testRule('import abc', rule);
        expect(res.content).to.have.length(2);
    });

    it('Not', () => {
        // true case
        testRule('FOO', Not(ExpectStr('FOO')), false);
        // false case
        testRule('FOO', Not(ExpectStr('something')), true);
    });

    it('Optional', () => {
        // none
        testRule('aaa', Optional(ExpectStr('never')));
        // some
        testRule('aaa', Optional(ExpectStr('aaa')));
    });

    it('Any', () => {
        let txt = 'a b c d e';
        // some
        let res = testRule(txt, Any(ExpectType('Identifier')));
        expect(res.content).to.have.length(5);
        // none
        res = testRule(txt, Any(ExpectType('NotIdentifier')));
        expect(res.content).to.have.length(0);
    });

    it('Some', () => {
        let txt = 'a b c d e';
        // none
        let res = testRule(txt, Some(ExpectType('NotIdentifier')), false);
        expect(res.content).to.have.length(0);
        // some
        res = testRule(txt, Some(ExpectType('Identifier')));
        expect(res.content).to.have.length(5);
    });

    it('OneOf', () => {
        let rule = OneOf([ExpectType('Identifier'), ExpectStr('import')]);
        // none
        testRule('123', rule, false);
        // some
        let res = testRule('abc', rule);
        console.log(res);
        res = testRule('import', rule);
        console.log(res);
    });
});

describe('Parser', () => {
    
});