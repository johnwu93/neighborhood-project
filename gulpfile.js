require('./tasks/gulp/subtasks/lint');
require('./tasks/gulp/subtasks/styles');
require('./tasks/gulp/subtasks/scripts');
require('./tasks/gulp/subtasks/watch');

const gulp = require('gulp');

gulp.task('build', ['scripts', 'compileSCSS']);
