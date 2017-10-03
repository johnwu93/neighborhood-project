/* eslint-disable import/no-extraneous-dependencies */
const gulp = require('gulp');
const scss = require('gulp-scss');

const STYLES_SOURCE_PATH = 'src/styles/styles.scss';
const STYLES_DESTINATION_PATH = 'build/styles';


gulp.task('compileSCSS', () => {
  gulp.src(STYLES_SOURCE_PATH)
    .pipe(scss())
    .pipe(gulp.dest(STYLES_DESTINATION_PATH));
});
