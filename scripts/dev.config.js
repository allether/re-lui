var webpack = require("webpack");
var path = require("path");
var cfg = {
	devtool: 'source-map',
	module: {
		rules: [
			{ test: /\.coffee$/, use: "coffee-loader"},
			{ test: /\.(xml|html|txt|md|glsl|svg)$/, loader: "raw-loader" },
			{ test: /\.(less)$/, exclude: /^(https?:)?\/\//,use: ['style-loader',{loader:'css-loader',options: {
			    modules: true,
			    // importLoaders: 1,
			    localIdentName: '_lui_[hash:base64:5]'
			  }},'less-loader'] },
			{ test: /\.(css)$/, exclude: /^(https?:)?\/\//, use: ['style-loader','css-loader'] },
			{ test: /\.(woff|woff2|eot|ttf|png)$/,loader: 'url-loader?limit=65000' }
		]
	},
	entry: {
		demo: "./demo.coffee",
		index: "./components/index.coffee",
	},
	resolve: {
		// "modules": [__dirname+"/node_modules"],
	},
	externals: process.env.NODE_ENV == 'production' && ["preact","preact-slide","classnames","color","css"] || [],
	output: {
		path: path.join(__dirname,'..','/'),
		publicPath: '/',
		filename: "[name].js"
	},
	devServer: {
		port: 3234
	}
}
module.exports = cfg;