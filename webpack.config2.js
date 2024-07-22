const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    // Entry point for the bundle
    entry: './src/index.tsx',
    
    // Output configuration
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },

    experiments: {
        asyncWebAssembly: true,
    },

    target: 'node',
    externals: [nodeExternals()],
    
    // Module resolution configuration
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        fallback: {
            "os": require.resolve("os-browserify/browser"),
            "fs": require.resolve("browserify-fs"),
            "path": require.resolve("path-browserify"),
            util: require.resolve('util/'),
            stream: require.resolve('stream-browserify'),
            crypto: require.resolve("crypto-browserify"),
            http: require.resolve('stream-http'),
            timers: require.resolve("timers-browserify"),
            zlib: require.resolve('browserify-zlib'),
            assert: require.resolve("assert/"),
            url: require.resolve("url/"),
            https: require.resolve('https-browserify'),
            "https-proxy-agent": require.resolve("https-proxy-agent"),
            "assert": require.resolve("assert/"),
            "crypto": require.resolve("crypto-browserify"),
            "path": require.resolve("path-browserify"),
            "stream": require.resolve("stream-browserify"),
            "timers": require.resolve("timers-browserify"),
            "util": require.resolve("util/"),
            'fs/promises': false,
            // "async_hooks": false,
            // async_hooks: false,
            // https: false,
            // querystring: false,
            // net: false,
            // fs: false,
            // child_process: false,
            // crypto: false,
            // tls: false,
            // dns: false,
        },
        // alias: {
        //     fs: 'browserify-fs',
        //     timers: 'timers-browserify',
        //     querystring: 'querystring-browser',
        //     // 'fs/promises': 'browserify-fs/promises',
        //     'timers': 'timers-browserify',
        // }
    },
    
    // Module rules for handling different types of files
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
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    
    // Plugins configuration
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
    ],
    
    // Development server configuration
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        historyApiFallback: true,
    },
    
    // Enable detailed error information in stats
    stats: {
        errorDetails: true
    },
    
    // Source maps for better debugging
    devtool: 'source-map',
};
