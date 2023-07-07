const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.jsx',

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },

  devServer: {
    port: 3000,
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
    }),
    new Dotenv(),
  ],

  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
      assert: require.resolve('assert'),
      fs: false, // This indicates that you don't want to include a polyfill for 'fs'
    },
  },
};
