const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./client/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve("client/build"),
    publicPath: "/",
  },
  module: {
    rules:[
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.html$/,
        use: "html-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

}