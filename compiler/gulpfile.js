const {task, src, dest, series, parallel} = require("gulp");
const ts = require("gulp-typescript");
const exec = require("gulp-exec");
const replace_ext = require("replace-ext");
const mocha = require("gulp-mocha");
const { reporter } = require("gulp-typescript");

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

/**
 * @name build
 * @description Build compiler
 */
task('build', series(compile_ne, compile_ts));

/**
 * @name test
 * @description Launch test
 */
task('test', series('build', function(){
    return src('build/tests/*.js')
        .pipe(mocha({reporter: 'spec', }));
}));

/**
 * @name railroad
 * @description Generate Railroad graph for grammar
 */
task('railroad', function(){
    return src('src/**/*.ne')
        .pipe(exec(file => `nearley-railroad ${file.path} -o ${replace_ext(file.path, '.html')}`))
        .pipe(exec.reporter({err: true, stderr: true, stdout:true}));
});