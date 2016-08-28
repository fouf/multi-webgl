/**
 * ServerManager.js
 * Fahid Jarmache
 * An instance of this is created inside of server game, which will be passed to this class as the first argument serverGame.
 * Classes that extend this should provide the following functions,
 * addPlayer, for when a player should be added to the game
 * removePlayer, for when a player is removed from the game
 * These functions will accept one argument, the socket connection.
 */
'use strict';

const debug = require("debug")("saerfim:ServerManager");
const Constants = require("../model/Constants.js");
const Client = require("./Client");
class ServerManager {
    constructor(serverGame, server) {
        if (serverGame.addPlayer === undefined || serverGame.removePlayer === undefined) {
            debug("Network class not implementing required methods.");
            throw("Missing methods.");
        }
        this.serverGame = serverGame;
        this.nextClientID = Constants.SERVER.FIRST_CLIENT_ID;
        this.clients = new Map(); // A map for clients, SocketIDs -> Client
        this.setupSocketIO(server);
    }
    /**
     * Setup socket.io
     */
    setupSocketIO(server) {
        const io = require("socket.io")(server);
        var that = this;
        io.on("connection", function(socket) {
            that.onSocketConnection(socket);
            socket.on("disconnect", function() {
                that.onSocketClosed(socket);
            });
            socket.on("message", function () {
                that.onSocketMessage(socket);
            });
        });

        debug("(ServerManager)::setupSocketIO");
    }
    /**
     * Called when we get a connection
     */
    onSocketConnection(socket) {
        var ourClient = new Client(socket, this.getNextClientID());
        this.clients.set(ourClient.getSocketID, ourClient);
        debug("::onSocketConnection received a connection from " + ourClient.toString());
    }
    /**
     * Called when a socket is closed
     */
    onSocketClosed(socket) {
        // Remove the client
        if (this.clients.has(socket.id)) {
            this.shouldRemovePlayer(socket.id);
            this.clients.delete(socket.id);
        }
        debug("::onSocketClosed");
    }
    /**
     * Called when a socket receives a message
     */
    onSocketMessage(socket) {

    }
    /**
     * Get's the next client ID
     * @return {number} the client ID
     */
    getNextClientID() {
        return ++this.nextClientID;
    }
    /**
     * 
     */
    addPlayer(client) {
        debug("::addPlayer");
    }
    /**
     * removePlayer
     */
    removePlayer(client) {

    }
    /**
     * tick
     * Updates all of our clients.
     */
    tick(gameClock, worldSnapshot) {
        // Send client updates
        this.clients.forEach(function(value, key) {
            value.queueAndSendWorldSnapshot(gameClock, worldSnapshot);
        }, this.clients);
    }
}

module.exports = ServerManager;