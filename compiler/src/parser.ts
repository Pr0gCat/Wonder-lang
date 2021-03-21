/*
    parser.ts - Generate AST from code.
*/
import { Parser as NearleyParser, Grammar } from "nearley";
import { default as grammar } from "./grammar";
import { File } from "./ast/namespaces";

import * as fs from 'fs';

export class ParserState {
    filename: string | undefined;
    constructor(
        public imports: object[] = [], 
        public tree: object[] = [], 
        public comments: string[] = []
    ){}
}

export default class Parser {
    core_parser: NearleyParser;
    constructor() {
        this.core_parser = new NearleyParser(Grammar.fromCompiled(grammar));
    }

    public parse(code: string): ParserState{
        if(code.length == 0) return new ParserState();
        code += '\n';
        this.core_parser.feed(code);
        if(this.core_parser.results !== undefined){
            return this.core_parser.results[0];
        }
        throw Error('Nothing return');
    }

    public parseFile(file: string){
        let ast = this.parse(fs.readFileSync(file, {encoding: "utf-8"}));
        return
    }
}