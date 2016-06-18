const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: [ './client/index.js' ],
    vendor: [ 'jqlite', 'page', 'marked' ]
  },
  output: {
    path: path.resolve('./dist'), // this MUST be an absolute path
    filename: 'index_bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(
      'vendor', 'vendor.bundle.js'
    ),
    new HtmlWebpackPlugin({
      title: 'Presentations'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-template-loader'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      }
    ]
  }
}