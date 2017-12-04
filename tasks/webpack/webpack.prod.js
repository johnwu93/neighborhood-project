/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');

const projectPaths = require('./webpack.project.paths');
const base = require('./webpack.base');
const util = require('./util');


// noinspection JSUnresolvedFunction
module.exports = merge(
  // to include scss, uncomment the next line;
  // generateDevScssModuleRule('styles.css'),
  base.BASE_CONFIG,
  util.includeConvertedPugPlugin(),
  {
    output: {
      path: projectPaths.PROD_DIRECTORY,
    },
    devtool: 'cheap-module-source-map',
    plugins: [
      new UglifyJSPlugin({
        sourceMap: true,
      }),
      new CopyWebpackPlugin([
        {
          from: path.join(projectPaths.ROOT_DIRECTORY, 'production-scripts'),
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
