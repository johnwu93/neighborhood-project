/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const projectPaths = require('./webpack.project.paths.js');

const VENDORS_DIR = 'vendors/';

const addVendors = function addVendors(copyCommands, vendorFileNames) {
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

const createCopyCommand = function createCopyCommand(src, dest) {
  return {
    from: src,
    to: dest,
  };
};

module.exports.includeVendors = function includeVendors(...vendorsFilePath) {
  const copyCommands = vendorsFilePath.map(filePath => createCopyCommand(filePath, VENDORS_DIR));

  const vendorFileNames = vendorsFilePath.map(fileName =>
    path.join(VENDORS_DIR, path.basename(fileName)),
  );

  return addVendors(copyCommands, vendorFileNames);
};

module.exports.includeModule = function includeModule(
  packagePath,
  newPackageName,
  ...relativeFilePaths
) {
  const packageDestination = path.join(VENDORS_DIR, newPackageName);
  const copyCommand = [createCopyCommand(packagePath, packageDestination)];


  const desiredImportedFiles = relativeFilePaths.map(fileName =>
    path.join(packageDestination, fileName),
  );

  return addVendors(copyCommand, desiredImportedFiles);
};


const includeHTMLPlugin = function includeHTMLPlugin() {
  return new HtmlWebpackPlugin({
    filename: 'index.html',
    template: projectPaths.includeSourceDir('template.html'),
  });
};

module.exports.includeConvertedPugPlugin = function includeConvertedPugPlugin() {
  return {
    plugins: [new HtmlWebpackPlugin({
      // For details on `!!` see https://webpack.github.io/docs/loaders.html#loader-order
      filename: 'index.html',
      template: `!!pug-loader!${projectPaths.includeSourceDir('templates/index.pug')}`,
    })],
  };
};

module.exports.includeAssetPlugins = function includeAssetPlugins() {
  return {
    plugins: [
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

