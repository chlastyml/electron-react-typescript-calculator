'use strict';

const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { spawn } = require('child_process');

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = path.resolve(__dirname, 'src');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
    entry: './src/main.ts',
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            include: defaultInclude
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
            include: defaultInclude
        }]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.css']
    },
    target: 'electron-renderer',
    plugins: [
        new HTMLWebpackPlugin({ template: path.resolve(__dirname, 'src/index.html') }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
    devtool: 'cheap-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        stats: {
            colors: true,
            chunks: false,
            children: false
        },
        before() {
            spawn(
                'electron',
                ['.'],
                { shell: true, env: process.env, stdio: 'inherit' }
            )
                .on('close', () => process.exit(0))
                .on('error', spawnError => console.error(spawnError));
        }
    }
};

module.exports = config;
