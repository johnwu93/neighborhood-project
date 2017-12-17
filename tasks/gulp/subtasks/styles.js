/* eslint-disable import/no-extraneous-dependencies */
const gulp = require('gulp');
const scss = require('gulp-scss');

const STYLES_SOURCE_PATH = 'src/styles/styles.scss';

const compile = function compile(destination) {
  gulp.src(STYLES_SOURCE_PATH)
    .pipe(scss())
    .pipe(gulp.dest(destination));
};

gulp.task('compileDevSCSS', () => {
  compile('temp/styles');
});

gulp.task('compileProdSCSS', () => {
  compile('build/styles');
});

