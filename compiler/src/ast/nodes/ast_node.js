"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASTNode = void 0;
;
class ASTNode {
    constructor(start, end) {
        this.line_start = 0;
        this.col_start = -1;
        this.line_end = 0;
        this.col_end = -1;
        function fetch_position(obj, end = false) {
            if (obj instanceof ASTNode) {
                let node = obj;
                return end ? [node.line_end, node.col_end] : [node.line_start, node.col_start];
            }
            if (Array.isArray(obj)) {
                let arr = obj;
                return fetch_position(end ? arr[0] : arr[-1]);
            }
            let token = obj;
            return end ? [token.line, token.col - token.text.length] : [token.line, token.col];
        }
        ;
        [this.line_start, this.col_start] = fetch_position(start);
        if (end) {
            [this.line_end, this.col_end] = fetch_position(end, true);
        }
        else {
            [this.line_end, this.col_end] = fetch_position(start, true);
        }
    }
    toJson() {
    }
}
exports.ASTNode = ASTNode;
