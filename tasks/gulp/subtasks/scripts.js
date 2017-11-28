/* eslint-disable import/no-extraneous-dependencies */
const gulp = require('gulp');
const webpack = require('webpack');
const webpackConfig = require('../../webpack/webpack.javascript.file.watcher');

gulp.task('scripts', callback =>
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err.toString());
    }

    // eslint-disable-next-line no-console
    console.log(stats.toString());
    callback();
  }));
