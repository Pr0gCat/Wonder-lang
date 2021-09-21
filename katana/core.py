from dataclasses import dataclass
from enum import Enum, auto
from katana.cu import CompileUnit
from katana import KROOT
from anytree import NodeMixin
import lark
from os.path import join
from io import FileIO

class OutputOption(Enum):
    DoNot = auto()
    Executable = auto()
    ObjectFile = auto()
    IR = auto()
    AST = auto()

@dataclass
class BuildConfig:
    entry_file: str = None
    output_option: OutputOption = OutputOption.Executable
    chatty: bool = False
    cwd: str = None
    lib_path: str = './lib'
    process_n = 4

@dataclass
class CodegenConfig:
    target_arch: str = "" # TODO: default should be host arch

class SourceObject(NodeMixin):
    def __init__(self, filename, abs_path, rel_path, parent=None, children=None) -> None:
        super().__init__()
        self.filename = filename
        self.abs_path = abs_path
        self.rel_path = rel_path
        self.text = ""
        self.decl_table: dict = {}
        self.dependences: list = []
        self.tree = None
        self.parent = parent
        if children:
            self.children = children

class DeclareType(Enum):
    Function = auto()
    Variable = auto()
    Constant = auto()
    Enum = auto()

def build(build_cfg: BuildConfig):

    # load grammar
    grammar = open(join(KROOT, 'katana.lark'), 'r').read()

    # parse 
    
    # semetic check

    # type check
    pass
