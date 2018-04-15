'use strict';

const exec = require('child_process').exec;
const path = require('path');
const argv = require('yargs').argv;
const gulp = require('gulp');
const sequence = require('gulp-sequence');
const typescript = require('gulp-typescript');
const uglify = require('gulp-uglify');
const gulpTslint = require('gulp-tslint');
const tslint = require('tslint');
const sourcemaps = require('gulp-sourcemaps');
const rm = require('gulp-rimraf');

// determine build environment (development | production).
let env = argv.env || 'development';

/**
 * General tasks
 */
gulp.task('git:hooks', () => {
  return gulp.src([
    'hooks/*'
  ]).pipe(gulp.dest('.git/hooks'));
});

/**
 * Server tasks.
 */
gulp.task('tslint', () => {
  const program = tslint.Linter.createProgram("./tsconfig.json");
  return gulp.src(['src/**/*.ts'])
    .pipe(gulpTslint({
      configuration: 'tslint.json',
      program: program,
      formatter: 'stylish'
    }))
    .pipe(gulpTslint.report({
      summarizeFailureOutput: true
    }));
});

const serverCompiler = typescript.createProject('./tsconfig.json');
gulp.task('compile', () => {
  return gulp.src(['src/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(serverCompiler())
    .pipe(sourcemaps.write('.', {
      sourceRoot: (file) => {
        return file.cwd + '/src'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('bundle', (callback) => {
  let rollupPath = path.join(__dirname, 'node_modules/.bin/rollup');
  exec(`${rollupPath} -c rollup.config.js`, (err, stdout, stderr) => {
    callback(err);
  });
});

gulp.task('transpile', () => {
  return gulp.src(['build/main.bundle.js'])
    .pipe(typescript({
      target: 'es5',
      module: 'none',
      allowJs: true,
      outFile: 'main.min.js',
      lib: ['es6']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('build/bundles/'));
});

gulp.task('clean', () => {
  return gulp.src('build/').pipe(rm());
});

gulp.task('watch', () => {
  gulp.watch(['src/**/*.ts'], ['build']);
});

/**
 * Debug tasks
 */
gulp.task('build', sequence(
  'tslint',
  'compile'
));

/**
 * Release tasks
 */
gulp.task('release', sequence(
  'clean',
  'tslint',
  'compile',
  'bundle',
  'transpile'
));

gulp.task('default', ['build']);
