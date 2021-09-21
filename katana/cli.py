import argparse
from os import getcwd, path
from katana import CLI_APPNAME
from katana.core import compile, BuildConfig, OutputOption

output_type_lookup = {
    'bin': OutputOption.Executable,
    'obj': OutputOption.ObjectFile,
    'ir': OutputOption.IR,
    'ast': OutputOption.AST
}

def get_args():
    ap = argparse.ArgumentParser(CLI_APPNAME)
    sub_aps = ap.add_subparsers(dest='cmd', description='Command to execute')
    _add_version_command(sub_aps.add_parser('version'))
    _add_build_command(sub_aps.add_parser('build'))
    _add_env_command(sub_aps.add_parser('env'))
    return ap, ap.parse_args()

def _add_version_command(ap: argparse.ArgumentParser):
    ap.add_argument('of', nargs='?', choices=list(output_type_lookup.keys()), default='all', type=str,
        help='Version of which components (default: all)')
    ap.add_argument('--short', action='store_true',
        help='Display shorten version')

def _add_build_command(ap: argparse.ArgumentParser):
    ap.description='Build executable from source'
    ap.add_argument('entry_file', nargs='?')
    ap.add_argument('--chatty', action='store_true', 
        help=f"Make {CLI_APPNAME} chatty")
    ap.add_argument('--output', nargs='?', choices=['bin', 'ir', 'obj', 'ast'], default='bin', type=str,
        help='Specify type of output')
    ap.add_argument('--dry', action='store_true', 
        help='Dry run (won\'t generate anything.)')
    ap.add_argument('--lib', type=str,
        help='Specify external source destination')

def _add_env_command(ap: argparse.ArgumentParser):
    ap.description='Display environment settings'

def main():
    ap, args = get_args()
    print(args)
    if args.cmd == 'version':
        print('call for version')
    elif args.cmd == 'build':
        config = BuildConfig()
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

        if args.output:
            config.output_option = output_type_lookup[args.output]
        if args.dry:
            config.output_option = OutputOption.DoNot

        if args.lib:
            config.lib_path = args.lib

        config.entry_file = args.entry_file
        config.cwd = path.dirname(args.entry_file)
        config.chatty = args.chatty
        
        compile(config)
        
    elif args.cmd == 'env':
        pass # dump environment variable as json
    else:
        ap.print_help()
        ap.exit(-1, 'No command specified.')

if __name__ == '__main__':
    main()