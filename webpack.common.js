/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: ['vue-style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
            },
            // {
            //     test: /\.html$/,
            //     loader: 'html-loader',
            //     exclude: [/index.html/, /web-embedded.html/, /app.html/],
            // },
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     use: [
            //         {
            //             loader: 'babel-loader',
            //             options: {
            //                 plugins: ['lodash'],
            //                 presets: ['@babel/preset-env'],
            //             },
            //         },
            //     ],
            // },
        ],
    },
    // resolve: {
    //     alias: {
    //         vue$: 'vue/dist/vue.esm-bundler.js',
    //     },
    //     extensions: ['.js', '.vue', '.json'],
    // },
    resolve: {
        fallback: {
            buffer: require.resolve('buffer/'),
            stream: require.resolve('stream-browserify'),
            process: require.resolve('process/browser'),
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser', // Provide process globally// Provide Buffer globally
        }),
        new LodashModuleReplacementPlugin({
            shorthands: true,
            flattening: true,
        }),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            chunks: ['index'],
            hash: true,
            inject: true,
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/.htaccess' },
                { from: 'src/googlec58a354c37f26ea7.html' },
                { from: 'src/sitemap.txt' },
                { from: 'src/robots.txt' },
                { from: 'src/static' },
            ],
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de$/),
        new MomentTimezoneDataPlugin({
            startYear: 2019,
        }),
        new webpack.DefinePlugin({
            'global.conf': {
                timezone: JSON.stringify('Europe/Berlin'),
                store: {
                    pollen: { url: JSON.stringify('/api/pollen') },
                    pollenCurrentCount: { url: JSON.stringify('/api/pollen/current/count') },
                    measurements: { url: JSON.stringify('/api/measurements') },
                    locations: { url: JSON.stringify('/api/locations') },
                    seasons: { url: JSON.stringify('/api/seasons') },
                },
                securedStore: {
                    pollen: { url: JSON.stringify('/api/s/pollen') },
                    pollenCurrentCount: { url: JSON.stringify('/api/s/pollen/current/count') },
                    measurements: { url: JSON.stringify('/api/s/measurements') },
                    locations: { url: JSON.stringify('/api/s/locations') },
                    seasons: { url: JSON.stringify('/api/s/seasons') },
                },
            },
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,

        }),
    ],
    devServer: {
        open: true,
        static: {
            directory: './dist',
        },
        compress: true,
        port: 8080,
        historyApiFallback: true,
        hot: true,
    },
};
