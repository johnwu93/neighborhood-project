/* eslint-disable import/no-extraneous-dependencies */
const gulp = require('gulp');
const browserSync = require('browser-sync').create();


const initializeBrowser = function initializeBrowser() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './temp',
    },
  });
};


gulp.task('watch', () => {
  initializeBrowser();
});

