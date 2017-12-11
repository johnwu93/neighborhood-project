/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

const {join} = path;

const ROOT_DIRECTORY = path.resolve(__dirname, '../../');


const includeRootDir = function includeRootDir(filePath) {
  return join(ROOT_DIRECTORY, filePath);
};

const SOURCE_DIR = includeRootDir('src');
const includeSourceDir = function includeSourceDir(filePath) {
  return join(SOURCE_DIR, filePath);
};


module.exports.includeRootDir = includeRootDir;
module.exports.includeSourceDir = includeSourceDir;
module.exports.DEV_DIRECTORY = includeRootDir('temp');
module.exports.PROD_DIRECTORY = includeRootDir('build');
