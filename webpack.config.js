'use strict';

var path = require('path');

module.exports = {
  entry: {
    app: path.join(__dirname, './src/client/index.js')
  },
  output: {
      path: path.join(__dirname, './public'),
      filename: "[name].js"
  },
  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader" },
      { test: /\.css?$/,
        loaders: [ 'style', 'raw' ],
        include: path.join(__dirname, './src/client/')
      }]
  }
};
