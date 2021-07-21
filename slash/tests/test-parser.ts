import {describe, it} from 'mocha';
import {Rule, ExpectType, ExpectStr} from "../parsing/tree-builder";
import lexer from "../parsing/lexer-moo";

// describe('TreeBuilder', () => {
//     it('ExpectStr', () => {
//         let rule = ExpectStr('abc')
//         lexer.reset('abc')
//         let res = rule(lexer);
//         expect(res).toBeDefined
//     });

//     it('ExpectType', () => {

//     });

//     it('Rule', () => {
//         let rule = Rule([ExpectStr()], () => {

//         })

//         let false_
//     });

//     it('Not', () => {

//     });

//     it('Optional', () => {

//     });

//     it('Any', () => {

//     });

//     it('Some', () => {

//     });

//     it('OneOf', () => {

//     });
// });

describe('Parser', () => {
    it('aaa', () => {
        const p = Rule([ExpectStr('import'), ExpectType('Identifier')], 
            ([imports]) => {
                console.log(imports);
                return {success: true, content: []};
            });
        const l = lexer.reset('import');
        console.log(p(l));
    });
});