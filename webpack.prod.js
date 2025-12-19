const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: "production",
    optimization: {
        minimizer: [new TerserPlugin()]
    },
    plugins: [
        new webpack.DefinePlugin({
            'global.env': {
                apiBase: JSON.stringify(''),
            },
        }),
    ]
});