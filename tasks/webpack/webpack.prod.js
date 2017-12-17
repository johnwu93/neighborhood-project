/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const styles = require('./webpack.styles');

const projectPaths = require('./webpack.project.paths');
const base = require('./webpack.base');


// noinspection JSUnresolvedFunction
module.exports = merge(
  // to include scss, uncomment the next line;
  styles.generateProdScssModuleRule('styles.css'),
  base.BASE_CONFIG,
  {
    output: {
      path: projectPaths.PROD_DIRECTORY,
    },
    devtool: 'cheap-module-source-map',
    plugins: [
      new CopyWebpackPlugin([
        {
          from: projectPaths.includeRootDir('production-scripts'),
          to: projectPaths.PROD_DIRECTORY,
        },
      ]),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
    ],
  },
);
