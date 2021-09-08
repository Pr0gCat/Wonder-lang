import lark
import io

class Preprocessor:
    def __init__(self) -> None:
        pass

    class SupportiveSyntaxParser(lark.Transformer):
        def __init__(self, out_stream=io.StringIO()):
            self.out_stream = out_stream