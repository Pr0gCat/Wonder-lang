from arguments import build_argparser
"""
1. argument check
2. `build`
    2.1. environment check
    2.2. dependence resolve
    2.3. start compile
3. 
"""
 
def main():
    ap = build_argparser()
    args = ap.parse_args()

main()