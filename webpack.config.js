var path = require('path');

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
var pixi = path.join(phaserModule, 'build/custom/pixi.js');
var p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
	entry: path.join(__dirname, 'client/index.js'),
	output: { path: path.join(__dirname, '/static/js/'), filename: 'bundle.js' },
  module: {
    loaders: [
      { test: /pixi\.js/, loader: 'expose?PIXI' },
      { test: /phaser-split\.js$/, loader: 'expose?Phaser' },
      { test: /p2\.js/, loader: 'expose?p2' },
			{
			 test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
			 loader: 'babel', // 'babel-loader' is also a legal name to reference
			 query: {
					presets: ['es2015']
				}
			},
    ]
  },
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2,
    }
  }
};
