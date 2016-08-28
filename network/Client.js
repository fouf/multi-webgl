/**
 * Client.js
 * Fahid Jarmache
 * Represents a client that is connected to the server.
 */

'use strict';

var debug = require("debug")("saerfim:client");
const Constants = require("../model/Constants");

class Client {
	constructor(socket, id) {
		this.socket = socket;
		this.id = id;
		this.snapshotBuffer = []; // world snapshots queued for the client ??
		this.lastSnapshotUpdate = 0; // Time since last snapshot
	}
	/**
	 * Returns the client as a string
	 * @return {String} representing this client
	 */
	toString() {
		return "Client[" + this.socket.id + " - " + this.socket.request.connection.remoteAddress + "]";
	}
	/**
	 * Returns the client's socket ID (socket.io connection)
	 * @return {String} representing the client's socket id
	 */
	getSocketID() {
		return this.socket.id;
	}
	/**
	 * Returns the client's ID
	 * @return {String} representing the client's id'
	 */
	getClientID() {
		return this.id;
	}
	/**
	 * queueWorldSnapshot
	 * Queues up a world snapshot to be sent to the client, will send the current buffer if we can.
	 */
	queueAndSendWorldSnapshot(gameClock, worldSnapshot) {
		if (!worldSnapshot || worldSnapshot.entities.length <= 0)
			return;

		this.snapshotBuffer.push(worldSnapshot);
		if (gameClock - this.lastSnapshotUpdate >= Constants.SERVER.SNAPSHOT_UPDATE_RATE) {
			this.minimizeSnapshots(); // minimize our payload
			// send snapshots to this client.
			var snapshots = {
				gameClock: gameClock,
				sequence: 0, // TODO?
				buffer: this.snapshotBuffer,
			};
			this.socket.emit('snapshots', snapshots);
			this.lastSnapshotUpdate = gameClock;
			this.snapshotBuffer = []; // clear buffer
		}
	}
	/**
	 * minimizeSnapshots
	 * Removes stagnant entities, aswell as entities that are out of or range of interest from our snapshot buffer.
	 */
	minimizeSnapshots(){
		for (let snapshot of this.snapshotBuffer) {
			// TOOD, minimize!
			//debug(snapshot);
		}
	}
	//TODO??
	send(msg) {
		if (this.socket === null || !this.socket.connected) { // ??
			debug("Client socket connection not established.");
			return;
		}
	}
}

module.exports = Client;