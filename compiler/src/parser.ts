/*
    parser.ts - Generate AST from code.
*/
import { Parser as NearleyParser, Grammar } from "nearley";
import { default as grammar } from "./grammar";
import { File } from "./ast/namespaces";

import * as fs from 'fs';

export default class Parser {
    core_parser: NearleyParser;
    constructor() {
        this.core_parser = new NearleyParser(Grammar.fromCompiled(grammar));
    }

    public parse(code: string){
        if(code.length == 0) return null;
        code += '\n';
        this.core_parser.feed(code);
        return this.core_parser.results;
    }

    public parseFile(file: string){
        let ast = this.parse(fs.readFileSync(file, {encoding: "utf-8"}));
        return
    }
}