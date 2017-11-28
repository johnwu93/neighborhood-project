/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');

const base = require('./webpack.base');
const util = require('./util');

module.exports = merge(base.BASE_CONFIG, util.includeDevJSBundling());
