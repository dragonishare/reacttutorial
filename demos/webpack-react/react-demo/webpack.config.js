var path = require("path");

module.exports = {
	entry: {
		app: ["./src/main.js"]
	},
	output: {
		path: path.resolve(__dirname, "./build"),
		filename: "bundle.js",
		publicPath: "/build"
	},
	module: {
		loaders: [
		{
			test: /\.jsx?$/,
			loader: "babel-loader",
			exclude: /node_modules/,
			query: {
				presets: ["env"]
			}
		}
		]
	}
};