import argparse
from os import getcwd, path
from katana import KROOT, CLI_APPNAME

def get_args():
    ap = argparse.ArgumentParser(CLI_APPNAME)
    sub_aps = ap.add_subparsers(dest='cmd', description='Command to execute')
    _add_version_command(sub_aps.add_parser('version'))
    _add_build_command(sub_aps.add_parser('build'))
    _add_env_command(sub_aps.add_parser('env'))
    return ap, ap.parse_args()

def _add_version_command(ap: argparse.ArgumentParser):
    ap.add_argument('of', nargs='?', choices=['all', 'cli', 'core'], default='all', type=str,
        help='Version of which components (default: all)')
    ap.add_argument('--short', action='store_true',
        help='Display shorten version')

def _add_build_command(ap: argparse.ArgumentParser):
    ap.description='Build executable from source'
    ap.add_argument('entry_file', nargs='?')

def _add_env_command(ap: argparse.ArgumentParser):
    ap.description='Display environment settings'

def execute_build(entry_file):
    # preprocess entry file
    # parse entry file's importations
    # fulfil dependences
    # configure compiler
    # start compile
    # state: finished
    pass

def main():
    ap, args = get_args()
    print(args)
    if args.cmd == 'version':
        print('call for version')
    elif args.cmd == 'build':
        if not args.entry_file:
            print('Entry file not specified, using CWD.')
            args.entry_file = getcwd()
        if path.isdir(args.entry_file):
            # guess entry file
            prog_file = path.join(args.entry_file, 'main.k')
            lib_file = path.join(args.entry_file, 'lib.k')
            if path.isfile(prog_file):
                args.entry_file = prog_file
            elif path.isfile(lib_file):
                args.entry_file = lib_file
            else:
                ap.exit(-1, f'error: Could not find any entry file from "{args.entry_file}".')
        if not path.exists(args.entry_file):
            ap.exit(-1, f'error: File "{args.entry_file}" does not exists.')
        execute_build(args.entry_file)
    elif args.cmd == 'env':
        pass # dump environment variable as json
    else:
        ap.print_help()
        ap.exit(-1, 'No command specified.')

if __name__ == '__main__':
    main()