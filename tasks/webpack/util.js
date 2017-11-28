/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const projectPaths = require('./webpack.project.paths.js');

const VENDORS_DIR = 'vendors/';

module.exports.includeVendors = function includeVendors(...vendorsFilePath) {
  const copyCommands = vendorsFilePath.map(filePath => ({
    from: filePath,
    to: VENDORS_DIR,
  }));

  const vendorFileNames = vendorsFilePath.map((fileName) => {
    const locations = fileName.split('/');
    return path.join(VENDORS_DIR, locations[locations.length - 1]);
  });

  return {
    plugins: [
      new CopyWebpackPlugin(copyCommands),
      new HtmlWebpackIncludeAssetsPlugin({
        assets: vendorFileNames,
        append: false,
      }),
    ],
  };
};


const includeImagesPlugin = function includeImagesPlugin() {
  return new CopyWebpackPlugin([
    {from: path.resolve(projectPaths.SOURCE_DIRECTORY, 'img'), to: 'img'},
  ]);
};

const includeHTMLPlugin = function includeHTMLPlugin() {
  return new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve(projectPaths.SOURCE_DIRECTORY, 'template.html'),
  });
};

module.exports.includeAssetPlugins = function includeAssetPlugins() {
  return {
    plugins: [
      includeImagesPlugin(),
      includeHTMLPlugin(),
    ],
  };
};

module.exports.includeDevJSBundling = function includeDevJSBundling() {
  return {
    output: {
      path: projectPaths.DEV_DIRECTORY,
    },
    devtool: 'source-map',
  };
};

