// @ts-check

const HTMLWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
    entry: './src/main.ts',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.css']
    },
    mode: 'development',
    devServer: {
        // overlay: true,
        stats: 'errors-only'
    },
    module: {
        rules: [{
            include: resolve(__dirname, 'src'),
            test: /\.tsx?$/,
            loader: 'ts-loader'
        }, {
            include: resolve(__dirname, 'src'),
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(svg|png|jpg|etc)$/,
            exclude: [/\.inline\.svg$/],
            use: ['url-loader']
        }, {
            test: /\.inline\.svg$/,
            use: ['svg-react-loader']
        }]
    },
    plugins: [new HTMLWebpackPlugin({ template: resolve(__dirname, 'src/index.html') })]
};

module.exports = config;
