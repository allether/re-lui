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
			    localIdentName: 'lui-[hash:base64:5]'
			  }},'less-loader'] },
			{ test: /\.(css)$/, exclude: /^(https?:)?\/\//, use: ['style-loader','css-loader'] },
			{ test: /\.(woff|woff2|eot|ttf|png)$/,loader: 'url-loader?limit=65000' }
		]
	},
	entry: {
		demo: "./demo.coffee",
	},
	resolve: {
	    'alias': {
	    	'react': 'preact-compat',
	    	'react-dom': 'preact-compat'
	  	}
	},
	output: {
		path: path.join(__dirname,'..','/dist'),
		publicPath: '/dist',
		filename: "demo.js",
	},
	devServer: {
		port: 3234
	}
}
module.exports = cfg;