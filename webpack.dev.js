const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        open: true,
        hot: true,
        static: './dist', // Serves files from the "dist" directory
        historyApiFallback: true, // Enables SPA routing
        compress: true, // Enables gzip compression for served files
        port: 8080, // Default development server port
    },
    plugins: [
        new webpack.DefinePlugin({
            'global.env': {
                apiBase: JSON.stringify('https://pollenscience.eu'),
            },
        }),
    ],
});
