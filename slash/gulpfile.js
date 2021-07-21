const {task, src, dest, series, parallel} = require("gulp");
const ts = require("gulp-typescript");
const exec = require("gulp-exec");
const mocha = require("gulp-mocha");
const rename = require("gulp-rename");

var tsc = ts.createProject('tsconfig.json');

/**
 * @name compile-ts
 * @description Compile TypeScript files.
 */
function compile_ts(){
    return src('./**/*.ts')
        .pipe(tsc())
        .pipe(dest('build'));
}

task('default', (cb)=>{
    console.log(`Usage:
    gulp build - Build the whole compiler
    gulp test - Run all tests
    gulp clean - Remove all generated files
`)
    cb();
});

/**
 * @name build
 * @description Build compiler
 */
task('build', compile_ts);

/**
 * @name test
 * @description Launch test
 */
task('test', series(
    parallel('build', () => {
        // copy test code to build/
        return src('tests/test_code/*.ts')
            .pipe(rename(function(file) {
                file.dirname = 'tests/test_code';
            })).pipe(dest('build/'));
        }
    ),
    // Start all tests
    () => {
    return src('build/tests/*.js')
        .pipe(mocha({reporter: 'spec', bail: true, }));
    }
));

/**
 * @name clean
 * @description Remove all generated files and directories
 */
task('clean', () => {
    return src('build/')
        .pipe(exec(`rm -rfv build/`))
        .pipe(exec.reporter({err: true, stderr: true, stdout:true}));
});