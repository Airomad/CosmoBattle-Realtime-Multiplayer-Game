require("babel-polyfill");
const path = require('path');
const webpack = require('webpack');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('style.bundle.css');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: ["babel-polyfill", "whatwg-fetch", "./src/index.js"],
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist'
	},
	output: {
		filename: 'app.bundle.js',
		path: path.resolve(__dirname, 'dist')
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
			use: extractCSS.extract({
				use: [{
					loader: "css-loader?modules&importLoaders=1&localIdentName=[path][name]__[local]-[hash:base64:5]"
				}, {
					loader: "sass-loader"
				}],
				fallback: "style-loader"
			})
		},
		{
			test: /\.(png|svg|jpg|gif)$/,
			exclude: /node_modules/,
			loader: 'file-loader?limit=1024&name=images/[name]-[hash:base64:5].[ext]'
		},
		{
			test: /.(js|jsx)$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				plugins: ['transform-decorators-legacy'],
				presets: ['es2015', 'react', 'stage-2']
			}
		}
	]
	},
	plugins: [
		extractCSS,
		new WebpackCleanupPlugin({
			exclude: ['index.html', 'favicon/*', 'data/*'],
		}),
		new UglifyJSPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
	],
	resolve: {
	  extensions: ['.js', '.jsx'],
	  modules: ['src', 'node_modules', 'data/*', 'translation/*']
	},
};
