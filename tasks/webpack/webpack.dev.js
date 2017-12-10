/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const styles = require('./webpack.styles');
const merge = require('webpack-merge');

const projectPaths = require('./webpack.project.paths');
const base = require('./webpack.base');
const util = require('./util');


module.exports = merge(
  // to include scss, uncomment the next line
  styles.generateDevScssModuleRule('styles.css'),
  base.BASE_CONFIG,
  util.includeConvertedPugPlugin(),
  util.includeVendors(
    path.resolve(projectPaths.ROOT_DIRECTORY, 'node_modules/materialize-css/dist/css/materialize.css'),
    path.resolve(projectPaths.ROOT_DIRECTORY, 'node_modules/jquery/dist/jquery.js'),
    path.resolve(projectPaths.ROOT_DIRECTORY, 'node_modules/materialize-css/dist/js/materialize.js'),
  ),
  {
    devServer: {
      contentBase: projectPaths.DEV_DIRECTORY,
      compress: true,
      port: 3000,
    },
  },
  util.includeDevJSBundling(),
)
;
