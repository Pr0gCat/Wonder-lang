const {task, src, dest, series} = require("gulp");
const gulp_ts = require("gulp-typescript");
const gulp_exec = require("gulp-exec");
const replace_ext = require("replace-ext");
const path_util = require('path');

var tsc = gulp_ts.createProject('tsconfig.json');

/**
 * @name compile-ts
 * @description Compile TypeScript files.
 */
function compile_ts(){
    return src('src/**/*.ts')
        .pipe(tsc())
        .pipe(dest('lib'));
}

/**
 * @name compile-ne
 * @description Compile Nearley files.
 */
function compile_ne(){
    return src('src/**/*.ne')
        .pipe(gulp_exec(file => `nearleyc ${file.path} -o ${replace_ext(file.path)}`))
        .pipe(gulp_exec.reporter({err: true, stderr: true, stdout:true}));
}

/**
 * @name build
 * @description Build compiler
 */
task('build', series(compile_ne, compile_ts));

/**
 * @name build-test
 * @description Build tests
 */
task('build-test', series('build', function(){
    // Build tests
    return src('tests/*.ts')
        .pipe(tsc())
        .pipe(dest('tests'));
}));
