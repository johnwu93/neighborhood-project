require('./tasks/gulp/subtasks/lint');
require('./tasks/gulp/subtasks/styles');
require('./tasks/gulp/subtasks/scripts');
require('./tasks/gulp/subtasks/watch');
require('./tasks/gulp/subtasks/templates');
const runSequence = require('run-sequence');

const gulp = require('gulp');

gulp.task('build:dev', done => runSequence(['scripts', 'compileDevSCSS', 'copyAssets:temp:index'], 'buildHTML:temp:index', done));
gulp.task('build:prod', done => runSequence(['compileProdSCSS', 'copyAssets:build:index'], 'buildHTML:build:index', done));
