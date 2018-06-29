const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './receipe-app/src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },

    devServer: {
        contentBase: path.join(__dirname,'dist')

    }

    // plugins:
    //     [
    //     new htmlWebpackPlugin({filename: 'index.html'})
    //    ]
};