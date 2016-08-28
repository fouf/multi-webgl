/**
 * server.js
 * Fahid Jarmache
 */
'use strict';

const debug = require("debug")("saerfim:server");
const ServerGame = require("./core/ServerGame");
//const Game = require("./Game");

module.exports = function(server) {
	const test = new ServerGame(server);
	test.startClock();

	/*const io = require("socket.io")(server);

// Client connection
	io.on("connection", function(socket) {
		const client = new Client(socket);
		delete clients[socket.id];
		clients[socket.id] = client;
		debug("New connection, " + client.toString());

		// Client disconnect
		socket.on("disconnect", function() {
			const client = clients[socket.id];
			if (client === null)
				return;

			debug(client.toString() + " disconnected.");
			delete clients[socket.id];
		});


		socket.on("auth", function() {
			debug("received an auth");
			if (clients[socket.id] === null)
				return;

			io.emit('player', client.info);
		});

	});
*/
	//const ourGame = new Game();
	//ourGame.run();
};
