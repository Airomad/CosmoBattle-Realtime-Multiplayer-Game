require("babel-polyfill");
const path = require('path');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('style.css');

module.exports = {
  entry: ["babel-polyfill", "whatwg-fetch", "./src/index.js"],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build'
  },
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
      test: /\.css$/,
      exclude: /node_modules/,
      loaders: [
        'style-loader',
        'css-loader?localIdentName=[path][name]__[local]-[hash:base64:5]'
      ]
    },
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      loaders: [
        "style-loader",
        "css-loader?modules&importLoaders=1&localIdentName=[path][name]__[local]-[hash:base64:5]",
        "sass-loader"
      ]
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      exclude: /node_modules/,
      loader: 'file-loader?limit=1024&name=images/[name]-[hash:base64:5].[ext]'
    },
    {
      test: /.(js|jsx)$/,
      loaders: ['babel-loader', 'eslint-loader'],
      exclude: /node_modules/
    }
  ]
  },
  plugins: [
    extractCSS,
    new WebpackCleanupPlugin({
      exclude: ['index.html', 'favicon/*'],
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['src', 'node_modules', 'data/*', 'translation/*']
  },
};
