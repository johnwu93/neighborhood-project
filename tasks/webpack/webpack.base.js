/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');

const babelConfig = require('./webpack.babel.js');
const projectPaths = require('./webpack.project.paths.js');


module.exports.BASE_CONFIG = merge(babelConfig, {
  entry: [projectPaths.includeSourceDir('scripts/main.js')],
  output: {
    filename: 'bundle.js',
  },
});

