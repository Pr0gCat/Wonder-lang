/*
 * AST Builder - Parsing framework
 * Inspired by Sprache & Mocha
 */

export interface ParseResult {
    readonly success: boolean;
    readonly content?: any[];
}

export type BuilderRule = (lexer: moo.Lexer) => ParseResult;

export function Rule(rules: BuilderRule[], body: (...args: any[]) => ParseResult): BuilderRule{
    return (lexer: moo.Lexer): ParseResult => {
        let results = [];
        // only all rules passed could call body
        for (let i = 0; i < rules.length; i++) {
            const res = rules[i](lexer);
            if(!res.success) return {success: false};   
            results.push(res.content);     
        }
        return body(results);
    }
}

export function Not(rule: BuilderRule): BuilderRule{
    return (lexer) => {
        let res = rule(lexer);
        return {success: !res.success, content: res.content === undefined ? [] : res.content};
    }
}

/**
 * None or One
 * @param rule 
 */
export function Optional(rule: BuilderRule): BuilderRule{
    return (lexer) => {
        let res = rule(lexer);
        return {success: true, content: res.content === undefined ? [] : res.content};
    }
}

/**
 * None or More
 */
export function Any(rule: BuilderRule): BuilderRule{
    return (lexer) => {
        let results = [];
        let res;
        do {
            res = rule(lexer);
            if(res.success) results.push(res.content);
        } while (res.success);

        return {success: true, content: results};
    }
}

/**
 * One or More
 */
export function Some(rule: BuilderRule): BuilderRule{
    return (lexer) => {
        let results = [];
        let res;
        do {
            res = rule(lexer);
            if(res.success) results.push(res.content);
        } while (res.success);

        return results.length > 0 ? {success: true, content: results} : {success: false, content: []};
    }
}

export function OneOf(rules: BuilderRule[]): BuilderRule{
    return (lexer) => {
        for (const ele of rules) {
            //FIX THIS: lexer need to retract, 
            let res = ele(lexer);
            if(res.success) return res;
        }
        return {success: false, content: []};
    }
}

export function ExpectStr(value: string): BuilderRule{
    if(value.length == 0) throw Error("Field 'token_type' is empty");
    return (lexer) => {
        const token = lexer.next()
        if(token == undefined) return {success: false};
        if(token.value != value) return {success: false};
        return {success: true, content: [token]};
    }
}

export function ExpectType(token_type: string): BuilderRule{
    if(token_type.length == 0) throw Error("Field 'token_type' is empty");
    return (lexer) => {
        const token = lexer.next()
        if(token == undefined) return {success: false};
        if(token.type != token_type) return {success: false};
        return {success: true, content: [token]};
    }
}
