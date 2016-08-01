'use strict';

const debug = require("debug")("saerfim:server");
const Client = require("./client");
const gameloop = require("node-gameloop");
const World = require("./World");

module.exports = function(server) {

	const clients = {};
	const ourWorld = new World(0, 0, 100, 100);

	const io = require("socket.io")(server);

	// Client connection
	io.on("connection", function(socket) {
		const client = new Client(socket);
		delete clients[socket.id];
		clients[socket.id] = client;
		debug("New connection, " + client.toString());

		// Client disconnect
		socket.on("disconnect", function() {
			const client = clients[socket.id];
			if (client == null)
				return;

			debug(client.toString() + " disconnected.");
			delete clients[socket.id];
		});


		socket.on("auth", function() {
			debug("received an auth");
			if (clients[socket.id] == null)
				return;

			io.emit('player', client.info);
		});

	});

	var frameCount = 0;
	var id = gameloop.setGameLoop(function(delta) {
		// console.log("(frame=%s, delta=%s)", frameCount++, delta);
		// handle entities
		ourWorld.update(delta);
		
	}, 1000 / 20);

};
