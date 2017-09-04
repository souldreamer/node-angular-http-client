const path = require('path');
const webpack = require('webpack');

const production = process.env.NODE_ENV === 'production';

module.exports = {
	entry: './index.ts',
	output: {
		filename: 'index.js',
		path: path.join(__dirname, './dist')
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.json$/,
				loader: 'json-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js', '.json']
	},
	target: 'node',
	node: {
		__dirname: false,
		__filename: false
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': production ? '"production"' : '"development"'
		}),
		new webpack.NormalModuleReplacementPlugin(
			/src\/environments\/environment\.ts$/,
			production ? './environment.prod.ts' : 'environment.ts'
		)
	]
}
