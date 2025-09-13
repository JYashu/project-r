require('dotenv').config();

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

const NODE_ENV = 'development';
const DISABLE_FULL_REFRESH = 'false';
const CLIENT_PORT = '3636';

const plugins = [];
plugins.push(
  new MiniCssExtractPlugin({
    filename: '[name].[hash].css',
  }),
);

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/index.tsx'],
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        include: path.resolve(__dirname, 'src'),
        use: [{ loader: 'babel-loader', options: { cacheDirectory: '' } }],
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          'style-loader', // injects CSS into DOM
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2, // postcss-loader and sass-loader
              modules: {
                auto: true, // only enable CSS modules for *.module.scss
                localIdentName: '[path][name]__[local]--hash:base64:5',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, 'postcss.config.js'),
              },
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true, // must be true for resolve-url-loader or proper source maps
            },
          },
        ],
      },
      { test: /\.(png|svg|jpg)$/, loader: 'file-loader' },
    ],
  },
  plugins: [
    ...plugins,
    new webpack.EnvironmentPlugin({
      NODE_ENV,
      DISABLE_FULL_REFRESH,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './app.webflow', to: './webflow' },
        {
          from: path.resolve(__dirname, 'env.local.js'),
          to: './public/env.js',
          noErrorOnMissing: true,
        },
        { from: './public', to: './public' },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src', 'index.html'),
    }),
  ],

  devServer: {
    host: '0.0.0.0',
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    historyApiFallback: {
      index: '/index.html',
      rewrites: [
        {
          from: /^\/project-r\/$/,
          to: '/index.html',
        },
      ],
    },
    hot: true,
    port: CLIENT_PORT,
    allowedHosts: 'all',
  },
};
