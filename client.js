'use strict';

class Client {
	constructor(socket) {
		this.socket = socket;
		this.info = {
			id: socket.id,
		};
	}

	toString() {
		return "Client[" + this.socket.id + " - " + this.socket.request.connection.remoteAddress + "]";
	}
}

module.exports = Client;
