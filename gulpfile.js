require('./tasks/gulp/subtasks/lint');
require('./tasks/gulp/subtasks/styles');
require('./tasks/gulp/subtasks/scripts');
require('./tasks/gulp/subtasks/watch');
require('./tasks/gulp/subtasks/templates');
const runSequence = require('run-sequence');

const gulp = require('gulp');

gulp.task('build', done => runSequence(['scripts', 'compileSCSS', 'copyAssets:index'], 'buildHTML:index', done));
