import argparse
from katana import CLI_APPNAME

def build_argparser():
    ap = argparse.ArgumentParser(CLI_APPNAME)
    
    return ap