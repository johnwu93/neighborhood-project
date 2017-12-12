/* eslint-disable import/no-extraneous-dependencies */
const gulp = require('gulp');
const pug = require('gulp-pug');
const path = require('path');
const runSequence = require('run-sequence');


const inject = require('gulp-inject');

const ROOT = path.resolve(__dirname, '../../../');
const INDEX = 'index';
const PUG_SOURCE_PATH = path.join(ROOT, `src/templates/${INDEX}.pug`);

const TEMP_PATH = path.join(ROOT, 'temp');

const VENDORS_PATH = path.join(TEMP_PATH, 'vendors');
const MATERIALIZE_PATH = path.join(VENDORS_PATH, 'materialize-css');
const OUTPUT_HTML_FILE = path.join(TEMP_PATH, `${INDEX}.html`);

const copyFiles = function copyFiles(selectedCopyFiles, destination) {
  gulp
    .src(selectedCopyFiles)
    .pipe(gulp.dest(destination));
};
const injectFiles = function injectFiles(htmlInputFile, injectedFilePaths) {
  const computedOptions = {
    read: false,
  };
  return gulp.src(htmlInputFile)
    .pipe(inject(gulp.src(injectedFilePaths, computedOptions), {relative: true}))
    .pipe(gulp.dest(TEMP_PATH));
};

gulp.task('compilePug', (done) => {
  gulp
    .src(PUG_SOURCE_PATH)
    .pipe(pug({}))
    .pipe(gulp.dest(TEMP_PATH))
    .on('end', () => done());
});

gulp.task('copyAssets', (done) => {
  copyFiles('./node_modules/materialize-css/dist/**/*', MATERIALIZE_PATH);
  copyFiles('node_modules/jquery/dist/jquery.js', VENDORS_PATH);
  done();
});

gulp.task('injectHTMLDependencies', () => {
  injectFiles(OUTPUT_HTML_FILE, [
    path.join(MATERIALIZE_PATH, 'css/materialize.css'),
    path.join(MATERIALIZE_PATH, 'js/materialize.js'),
    path.join(VENDORS_PATH, 'jquery.js'),
    path.join(TEMP_PATH, 'styles/styles.css'),
    path.join(TEMP_PATH, 'bundle.js'),
  ]);
});


gulp.task('buildHTML', done =>
  runSequence(['compilePug', 'copyAssets'], 'injectHTMLDependencies', done),
);
