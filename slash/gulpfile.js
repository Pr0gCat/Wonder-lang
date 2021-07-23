const {task, src, dest, series, parallel} = require("gulp");
const ts = require("gulp-typescript");
const exec = require("gulp-exec");
const mocha = require("gulp-mocha");
const rename = require("gulp-rename");
const replace_ext = require("replace-ext");

var tsc = ts.createProject('tsconfig.json');

/**
 * @name compile-ts
 * @description Compile TypeScript files.
 */
function compile_ts(){
    return src('src/**/*.ts')
        .pipe(tsc())
        .pipe(dest('build'));
}

/**
 * @name compile-ne
 * @description Compile Nearley files.
 */
function compile_ne(){
    return src('src/**/*.ne')
        .pipe(exec(file => `nearleyc ${file.path} -o ${replace_ext(file.path, '.ts')}`))
        .pipe(exec.reporter({err: true, stderr: true, stdout:true}));
}

task('default', (cb)=>{
    console.log(`Usage:
    gulp build - Build the whole compiler
    gulp test - Run all tests
    gulp railroad - Generate railroad diagram
    gulp clean - Remove all generated files
`)
    cb();
});

/**
 * @name build
 * @description Build compiler
 */
task('build', series(compile_ne, compile_ts));

/**
 * @name railroad
 * @description Generate Railroad graph for grammar
 */
task('railroad', function(){
    return src('src/**/*.ne')
        .pipe(exec(file => `nearley-railroad ${file.path} -o ${replace_ext(file.path, '.html')}`))
        .pipe(exec.reporter({err: true, stderr: true, stdout:true}));
});

/**
 * @name test
 * @description Launch test
 */
task('test', series(
    parallel('build', () => {
        // copy test code to build/
        return src('src/tests/test_code/*.ts')
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