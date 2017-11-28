/* eslint-disable import/no-extraneous-dependencies */
const gulp = require('gulp');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();

const stylesBuildFilePath = './build/styles/styles.css';
const JS_FILE_DIRECTORY = './src/scripts/**/*.js';

const watchJSFiles = function watchJSFiles() {
  watch(JS_FILE_DIRECTORY, () => {
    gulp.start('scriptsRefresh');
  });
};

const initializeBrowser = function initializeBrowser() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: '.',
    },
  });
};


gulp.task('watch', () => {
  initializeBrowser();

  watch('./index.html', () => {
    browserSync.reload();
  });

  watch(stylesBuildFilePath, () => {
    gulp.start('cssInject');
  });

  watchJSFiles();
});

gulp.task('watch:js', () => {
  watch(JS_FILE_DIRECTORY, () => {
    gulp.start('scriptsRefresh');
  });
});

gulp.task('cssInject', () => {
  gulp
    .src(stylesBuildFilePath)
    .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], () => {
  browserSync.reload();
});
