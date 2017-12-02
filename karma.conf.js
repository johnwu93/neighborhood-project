/* eslint-disable import/no-extraneous-dependencies */

const merge = require('webpack-merge');
const babelConfig = require('./tasks/webpack/webpack.babel.js');

module.exports = function exports(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'jasmine-matchers'],


    // list of files / patterns to load in the browser
    files: [
      {pattern: 'test/**/*.js', watched: false},
    ],

    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/**/*.js': ['webpack', 'sourcemap'],
    },

    webpack: merge(
      babelConfig,
      {devtool: 'inline-source-map'},
    ),

    webpackServer: {
      noInfo: true,
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // Continuous Integration mode
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    logLevel: config.LOG_DEBUG,


    // start these browsers
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeCanary'],

    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
