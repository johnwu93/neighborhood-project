/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const merge = require('webpack-merge');

const projectPaths = require('./webpack.project.paths');
const base = require('./webpack.base');
const styles = require('./webpack.styles');
const util = require('./util');


const TRANSPILED_CSS = 'styles.css';
module.exports = merge(
  styles.generateDevScssModuleRule(TRANSPILED_CSS),
  base.BASE_CONFIG,
  util.includeAssetPlugins(),
  util.includeVendors(
    path.resolve(projectPaths.ROOT_DIRECTORY, 'node_modules/animate.css/animate.css'),
    path.resolve(projectPaths.ROOT_DIRECTORY, 'node_modules/bootstrap/dist/css/bootstrap.css'),
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
