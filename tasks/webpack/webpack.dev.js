/* eslint-disable import/no-extraneous-dependencies */
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
  util.includeModule(
    projectPaths.includeRootDir('node_modules/materialize-css/dist'),
    'materialize',
    'css/materialize.css',
    'js/materialize.js',
  ),
  util.includeVendors(
    projectPaths.includeRootDir('node_modules/jquery/dist/jquery.js'),
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
