const path = require('path');
const nodeExternals = require('webpack-node-externals');

const CURRENT_WORKING_DIR = process.cwd();

const config = {
    name: 'server',
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    entry: [path.join(CURRENT_WORKING_DIR, './bin/www')],
    output: {
        filename: 'server.generated.js',
        path: path.join(CURRENT_WORKING_DIR, './dist'),
        publicPath: '/dist/',
        libraryTarget: 'commonjs2'
    },
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
                use: 'file-loader'
            }
        ]
    }
}

module.exports = config;
