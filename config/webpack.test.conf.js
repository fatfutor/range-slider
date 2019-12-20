const webpack = require('webpack');
const path = require('path');
const fs = require('fs');


module.exports = {
  entry: "./test/index.js",
  output: {
    path: "/test-dist/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      }
    ],
  }
};
