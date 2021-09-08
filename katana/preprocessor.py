import lark
import io

class PreprocessInterpreter(lark.visitors.Interpreter):
    def __init__(self, out_fp:io.StringIO) -> None:
        super().__init__()
        self.out_fp = out_fp

    def ss_if(self, tree):
        pass

    def ss_elif(self, tree):
        pass

    def ss_else(self, tree):
        pass

    def ss_msg(self, tree):
        _, msg = tree.children
        print(f'@msg: {msg}')

    def ss_error(self, tree):
        _, msg = tree.children
        print(f'@error: {msg}')

    def ss_md(self, tree):
        # Turn everything inside this section into string
        pass

    def ss_var(self, tree):
        pass

    def ss_section_content(self, tree):
        pass

def preprocess(out_fp: io.StringIO, tree: lark.Tree):
    trans = PreprocessInterpreter(out_fp)
    for node in tree.children:
        t = type(node) 
        if t is lark.Tree:
            trans.visit(node)
            continue
        # is token
        if node.type == 'CODE' or node.type == 'NL':
            out_fp.write(node.value)
        elif node.type == 'SS_VAR':
            # Compiler variable
            _process_variable(out_fp, node)
