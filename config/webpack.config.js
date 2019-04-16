const path = require('path');
const rules = require('./rule');
const plugins = require('./plugin');
const config = require('./config');
const {
  publicPath,
  isPro,
  isDev,
} = config;
const webpackConfig = {
  context: path.resolve(__dirname, './'),
  devtool: isPro ? 'cheap-module-source-map' : isDev && false,
  mode: isPro ? 'production' : 'development',
  entry: '../src/index.tsx',
  output: {
    filename: isDev ? 'js/index.js' : 'js/index.[contenthash:8].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath,
  },
  devServer: {
    port: '5488',
    host: 'localhost',
    hot: true,
    open: true,
    publicPath: '/',
    contentBase: '..',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  performance: {
    hints: false,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  module: {
    rules,
  },
  plugins,
};

module.exports = webpackConfig;
