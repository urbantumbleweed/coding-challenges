'use strict';

var path = require('path');

module.exports = {
  entry: {
    app: path.join(__dirname, './src/client/app.js')
  },
  output: {
      path: path.join(__dirname, "public"),
      filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  }
};
