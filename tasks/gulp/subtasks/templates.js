/* eslint-disable import/no-extraneous-dependencies */
const ModuleCopier = require('./modulecopier');

const gulp = require('gulp');
const pug = require('gulp-pug');
const path = require('path');
const runSequence = require('run-sequence').use(gulp);


const inject = require('gulp-inject');

const ROOT = path.resolve(__dirname, '../../../');
const injectFiles = function injectFiles(htmlInputFile, injectedFilePaths, outputDestination) {
  return gulp.src(htmlInputFile)
    .pipe(inject(gulp.src(injectedFilePaths, {read: false}), {relative: true}))
    .pipe(gulp.dest(outputDestination));
};

class HTMLBuilder {
  constructor(pugFile, outputDest) {
    this.pugFile = pugFile;
    this.outputDest = outputDest;

    const vendorsPath = path.join(outputDest, 'vendors');

    this.materializeModule = new ModuleCopier(
      'node_modules/materialize-css/dist/**/*',
      path.join(vendorsPath, 'materialize-css'),
      ['css/materialize.css', 'js/materialize.js'],
    );
    this.jqueryModule = new ModuleCopier(
      'node_modules/jquery/dist/jquery.js',
      vendorsPath,
      ['jquery.js'],
    );
  }

  compilePug(done) {
    gulp
      .src(this.pugFile)
      .pipe(pug({}))
      .pipe(gulp.dest(this.outputDest))
      .on('end', () => done());
  }

  copyFiles() {
    this.materializeModule.copy();
    this.jqueryModule.copy();
  }

  injectDependencies() {
    const filesToInject = [
      ...this.jqueryModule.findFiles(),
      ...this.materializeModule.findFiles(),
      path.join(this.outputDest, 'styles/styles.css'),
      path.join(this.outputDest, 'bundle.js'),
    ];
    const fileName = path.basename(this.pugFile, '.pug');
    const compiledFileName = path.join(this.outputDest, `${fileName}.html`);
    injectFiles(
      compiledFileName,
      filesToInject,
      this.outputDest,
    );
  }
}

const createBuilder = function createBuilder(id, destination) {
  return {
    id,
    destination,
    htmlBuilder:
      new HTMLBuilder(path.join(ROOT, `src/templates/${id}.pug`), path.join(ROOT, destination)),
  };
};

const createTasks = function createTasks() {
  const builders = [
    createBuilder('index', 'temp'),
    createBuilder('index', 'build'),
  ];
  builders.forEach(({id, destination, htmlBuilder}) => {
    const compilePugTask = `compilePug:${id}`;
    gulp.task(compilePugTask, done => htmlBuilder.compilePug(done));
    gulp.task(`copyAssets:${destination}:${id}`, () => htmlBuilder.copyFiles());
    const injectHTMLDependenciesTask = `injectHTMLDependencies:${destination}:${id}`;
    gulp.task(injectHTMLDependenciesTask, () => htmlBuilder.injectDependencies());
    gulp.task(`buildHTML:${destination}:${id}`, done =>
      runSequence(compilePugTask, injectHTMLDependenciesTask, done),
    );
  });
};

createTasks();

