const path = require('path');
require("babel-polyfill");

module.exports = {
    context: __dirname,
    entry: ["babel-polyfill", './frontend/blueplate.jsx'],
    output: {
        path: path.join(__dirname, 'app', 'assets', 'javascripts'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '*']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/env', '@babel/react']
                    }
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    // devtool: 'eval-source-map'
};
