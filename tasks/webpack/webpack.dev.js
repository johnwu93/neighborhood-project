/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');

const projectPaths = require('./webpack.project.paths');
const base = require('./webpack.base');
const util = require('./util');


module.exports = merge(
  // to include scss, uncomment the next line
  // generateDevScssModuleRule('styles.css'),
  base.BASE_CONFIG,
  util.includeAssetPlugins(),
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
