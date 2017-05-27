const webpack = require("webpack");
const path = require("path");

module.exports = {
    devtool: "inline-source-map",
    target: "web",
    entry: [
        "react-hot-loader/patch",
        'webpack-hot-middleware/client?path=http://localhost:3001/__webpack_hmr',
        "./src/client/index",
    ],
    output: {
        path: path.join(__dirname, "build"),
        publicPath: "http://localhost:3001/",
        filename: "client.js",
    },
    module: {
        rules: [{
            test: /\.js?$/,
            use: "babel-loader",
            include: [
                path.join(__dirname, "src/client"),
                path.join(__dirname, "src/common"),
            ],
        }],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": { BUILD_TARGET: JSON.stringify("client") },
        }),
    ],
};
