/**
 * server.js
 * Fahid Jarmache
 */
'use strict';

const debug = require("debug")("saerfim:server");
const Box2DServerGame = require("./Box2D/Box2DServerGame");

module.exports = function(server) {
	const b2dsg = new Box2DServerGame(server);
	b2dsg.startClock();
};
