const webpack =  require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const CURRENT_WORKING_DIR = process.cwd()

const config = {
    mode: 'development',
    name: 'server',
    entry: path.join(CURRENT_WORKING_DIR, './app.js'),
    target: 'node',
    output: {
        path: path.join(CURRENT_WORKING_DIR, '/dist/'),
        filename: 'app.generated.js',
        publicPath: '/dist',
        libraryTarget: 'commonjs2'
    },
    externals: ['react', nodeExternals()],
    module: {
        rules: [
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use: [ 'babel-loader' ]
            },
            {
                test: /\.(ttf|eot|svg|gif|jpg|png|ico)(\?[\s\S]+)?$/,
                use: 'file-loader'
            }
        ]
    }
}

module.exports = config