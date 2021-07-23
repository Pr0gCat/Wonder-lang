import { Parser as NearleyParser, Grammar } from "nearley";
import { default as grammar } from "./grammar";
import { File } from "./ast/namespaces";

import * as fs from 'fs';

/**
 * Holds parse result
 * @field imports Holds importations
 * @field tree Holds AST
 * @field comments Holds collected comments
 */
export interface ParseResult {
    imports: object[];
    tree: object[];
    comments: object[];
}

export default class Parser {
    rules: Grammar;
    core_parser: NearleyParser;

    constructor() {
        this.rules = Grammar.fromCompiled(grammar);
        this.core_parser = new NearleyParser(this.rules);
    }

    /**
     * Parse text, should not call this function alone
     * @param code String of text
     * @returns ParseResult Parse result
     * @throws Error if nothing return
     */
    public parse(text: string): ParseResult {
        if (text.length == 0) return { imports: [], tree: [], comments: [] };
        text += '\n';
        this.core_parser.feed(text);
        if (this.core_parser.results !== undefined) {
            return this.core_parser.results[0];
        }
        throw Error('Nothing return');
    }
    /**
     * Parse file from file path
     * @param path File to read
     * @returns File object
     */
    public parseFile(path: string) {
        let content = fs.readFileSync(path, { encoding: "utf-8" });
        let result = this.parse(content);
        // reset parser
        this.resetState();
        return new File(path, content.split(/\r\n|\n/), result.imports, result.tree, result.comments);
    }

    /**
     * resetState
     * Nearley won't reset its parser state by itself, so here we go.
     * @see https://github.com/kach/nearley/issues/129
     */
    public resetState() {
        this.core_parser = new NearleyParser(this.rules);
    }
}