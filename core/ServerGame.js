/**
 * ServerGame.js
 * Fahid Jarmache
 * ABSTRACT
 */
'use strict';

const debug = require("debug")("saerfim:ServerGame");
const BaseGame = require("./BaseGame"); 
const ServerManager = require("../network/ServerManager");
const WorldSnapshot = require("../model/WorldSnapshot");
class ServerGame extends BaseGame {
    constructor(server) {
        super(server);
        this.nextEntityID = 0;
    }
    /**
     * Returns the next ID for an entity
     * @return {number} the entity's ID
     */
    nextEntityID() {
        return ++this.nextEntityID;
    }
    /**
     * setup
     * Basic setup for the sever game.
     */
    setup() {
        debug("::setup");
    }
    /**
     * addPlayer()
     * Should be implemented by the class that extends us.
     */
    addPlayer(clientID, data) {
        debug("addPlayer");
    }
    /**
     * updatePlayer
     * Should be implemented by the class that extends us.
     */
    updatePlayer(client, data) {
        debug("::updatePlayer");
    }
    /**
     * removePlayer
     * Should be implemented by the class that extends us.
     */
    removePlayer(clientID) {
        debug("::removePlayer");
    }
    /**
     * setupNetwork
     * Initializes the network for communicating with clients.
     */
    setupNetwork(server) {
        debug("::setupNetwork");
        this.network = new ServerManager(this, server);
    }
    /**
     * tick
     * Updates the game world, will create world snapshots which consists of entities to send to clients. (Which are sent to the network)
     */
    tick(deltaTime) {
        super.tick(deltaTime);
        // Update all entities

        // World Snapshots
        var worldSnapshot = new WorldSnapshot(this, this.entityManager.getEntities());
        // Let network tick
        this.network.tick(this.getGameClock(), worldSnapshot.snap());
    }
}

module.exports = ServerGame;