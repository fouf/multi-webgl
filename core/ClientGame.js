'use strict';
/**
 * ClientGame.js
 * Fahid Jarmache
 * ABSTRACT, to be extended
 */
const BaseGame = require("./BaseGame");
const debug = require("debug")("saerfim::ClientGame");
const ClientConnection = require("../network/ClientConnection");

class ClientGame extends BaseGame {
    constructor() {
        super();
        this.setupSocketIO();
    }
    /**
     * setupSocketIO
     * Sets up our socketIO connection
     */
    setupSocketIO() {

    }
    /**
     * setupNetwork()
     * Overidden function from BaseGame, set up our connection to the server.
     */
    setupNetwork() {
        this.network = new ClientConnection(this);
    }
    /**
     * onConnect
     * Should be implemented by the class that extends us.
     */
    onConnect() {
        debug("::onConnect");
    }
    /**
     * tick
     */
    tick(deltaTime) {
        super.tick(deltaTime);
        // process entities
        var entities = this.entityManager.getEntities();
        var that = this;
        entities.forEach(function(value, key) {
            value.updateEntity(deltaTime, that.getGameClock(), that.getGameTick());
        });
        // phaser???
        // run our network tick
        this.network.tick(this.getGameClock(), this.getGameTick());
    }
}

module.exports = ClientGame;
