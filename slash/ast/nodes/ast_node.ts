
export interface NearleyToken {
    value: any;
    text: string;
    offset: number;
    line: number;
    col: number;
};

export abstract class ASTNode {
    line_start: number = 0;
    col_start: number = -1;
    line_end: number = 0;
    col_end: number = -1;

    constructor(start: ASTNode | NearleyToken | (ASTNode | NearleyToken)[], end?: ASTNode | NearleyToken){
        function fetch_position(obj: ASTNode | NearleyToken | (ASTNode | NearleyToken)[], end: boolean = false): [number, number]{
            if(obj instanceof ASTNode){
                let node = (obj as ASTNode);
                return end ? [node.line_end, node.col_end] : [node.line_start, node.col_start];
            }
            if(Array.isArray(obj)){
                let arr = (obj as ASTNode[]);
                return fetch_position(end ? arr[0] : arr[-1]);
            }
            let token = (obj as NearleyToken);
            return end ? [token.line, token.col-token.text.length] : [token.line, token.col];
        };

        [this.line_start, this.col_start] = fetch_position(start);
        if(end){
            [this.line_end, this.col_end] = fetch_position(end, true);
        }else{
            [this.line_end, this.col_end] = fetch_position(start, true);
        }
    }
    
    abstract build(): ASTNode

    toJson(){
        
    }
}