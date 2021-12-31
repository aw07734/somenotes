const path = require('path');
const webpack = require('webpack');

const merge = require('webpack-merge');

const baseWebpackConfig = require('./webpack.config');

module.exports = merge(baseWebpackConfig, {
    target: 'node',
    entry: {
        app: './src/entry-server.js'
    },
    output: {
        path: __dirname,
        filename: 'server.bundle.js',
        libraryTarget: 'commonjs2'
    }
});