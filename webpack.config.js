const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const resolvedSchema = require('json-schema-loader');
module.exports = {
    mode: 'development',
    entry: './src',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js"
    },
    module: {
        rules: [
            {
                test: /\.ts/,
                loader: "ts-loader"
            },
            {
                test: /\.json/,
                exclude: /node_modules/,
                loader: resolvedSchema
            }

        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 4201
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: 'src/parameters.json', to: './parameters.json',
            toType: 'file'
        },
            {
                from: './README.md', to: './README.md',
                toType: 'file'
            }
        ])]

};