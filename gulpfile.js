require('./gulp/tasks/lint');
require('./gulp/tasks/styles');
require('./gulp/tasks/scripts');
require('./gulp/tasks/watch');

const gulp = require('gulp');

gulp.task('build', ['scripts', 'compileSCSS']);
