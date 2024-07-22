const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    // target: 'node',
    externals: [
        nodeExternals({
            allowlist: [/^firebase/], // Allowlist Firebase dependencies
    }),],

    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        fallback: {
            "os": require.resolve("os-browserify/browser"),
            "fs": require.resolve("browserify-fs"),
            "path": require.resolve("path-browserify"),
            util: require.resolve('util/'),
            stream: require.resolve('stream-browserify'),
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        historyApiFallback: true,
    },
    stats: {
        errorDetails: true
    },
    
};
