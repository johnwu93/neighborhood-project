/* eslint-disable import/no-extraneous-dependencies */
const gulp = require('gulp');
const path = require('path');

const copyFiles = function copyFiles(selectedCopyFiles, destination) {
  gulp
    .src(selectedCopyFiles)
    .pipe(gulp.dest(destination));
};


class ModuleCopier {
  constructor(moduleBlob, destination, relativeFiles) {
    this.moduleBlob = moduleBlob;
    this.destination = destination;
    this.relativeFiles = relativeFiles;
  }

  copy() {
    copyFiles(this.moduleBlob, this.destination);
  }

  findFiles() {
    return this.relativeFiles.map(filePath => path.join(this.destination, filePath));
  }
}

module.exports = ModuleCopier;
