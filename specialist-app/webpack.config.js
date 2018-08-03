const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
    entry: "./src/App.js",
    output: {
        path: path.resolve('dist'),
        filename: 'bundled.js'
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    devServer: {
        hot: true,
        inline: true,
        port: 8080,
        historyApiFallback: true,
    },
    plugins: [htmlPlugin]
};