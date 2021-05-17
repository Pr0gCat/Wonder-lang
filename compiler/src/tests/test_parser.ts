import {describe, it} from "mocha";
import {assert} from "chai";
import * as path from "path";
import temp from "temp";
// Track temporary files and dirs
temp.track();

import { Chance } from "chance";
const chance = new Chance();

import Parser, { ParseResult } from "../parser";

// number of tries for random input
const RANDOM_N = 10000;

// The following tests share the same parser
let parser = new Parser();

describe('Parser', () => {
    it('.parse() with empty text', () => {
        let result = parser.parse('');
        assert.isDefined(result, "parse return nothing");
        assert.isEmpty(result.imports, "\"imports\" should be empty");
        assert.isEmpty(result.tree, "\"tree\" should be empty");
        assert.isEmpty(result.comments, "\"comments\" should be empty");
        parser.resetState();
    });

    // make sure basic functionality is working.
    it('.parseFile with empty file', () => {
            let temp_file = temp.openSync({suffix: '.w'})
            let result = parser.parseFile(temp_file.path);
            /* Validate path */
            assert.equal(temp_file.path, result.path);
            /* Validate name */
            let expected_name = path.basename(temp_file.path, path.extname(temp_file.path)).replace('.', '_');
            assert.strictEqual(expected_name, result.name, `Attribute name should be "${expected_name}" not "${result.name}".`);
            /* Validate imports */
            assert.isEmpty(result.imports, "Attribute imports should be empty.");
            /* Validate tree */
            assert.isEmpty(result.tree, 'Attribute tree should be empty.');
            /* Validate comments */
            assert.isEmpty(result.comments, 'Attribute comments should be empty.');
            /* Validate lines */
            assert.lengthOf(result.lines, 1, 'Attribute lines should be 1.'); // parser should append newline no matter what
            temp.cleanupSync();
        });
});

describe('Parsing', () => {
    describe('Declarations', () => {
        describe('Import', () => {
            // import single item
            it('Import single item', () => {
                let result = parser.parse('import abc');
                
            });
            
            // import multiple items
            it('Import multiple items', () => {
                let result = parser.parse('import abc, def, ghi');

            });
            
            // import-as
            it('Import-as', () => {

            });
            
            // import from name
            it('Import from name', () => {

            });
            // import from path
            it('Import from path', () => {

            });
            // from-import-as
            it('from-import-as', () => {

            });
        });

        it('Declare Variables', () => {

        });

        it('Declare Functions', () => {

        });
    });

    describe('Statements', () => {

    });
});