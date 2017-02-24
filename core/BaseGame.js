/**
 * BaseGame.js
 * Fahid Jarmache
 * An abstract base class which provides timing among other things.
 */
'use strict';

const Constants = require("../model/Constants");
const gameloop = require("node-gameloop");
const debug = require("debug")("saerfim:BaseGame");
const EntityManager = require("../EntityManager");

class BaseGame {
    constructor(server) {
        this.gameClock = 0;
        this.gameTick = 0;
        this.loopID = -1;
        this.running = true;
        this.network = null; // Will either be a ClientConnection or ServerManager
        this.entityManager = new EntityManager();

        this.setup();
        this.setupNetwork(server);
    }
    setup() {
        debug("::setup");
    }
    setupNetwork(server) {
        debug("::setupNetwork");
    }
    /**
     * The game tick, is run every tick by the game clock
     */
    tick(delta) {
        // ...
        this.entityManager.tick();
        this.gameClock += delta;
        this.gameTick++;
    }
    /**
     * Starts the game clock
     */
    startClock() {
        var that = this;
        this.loopID = gameloop.setGameLoop(function(delta) {
            that.tick(delta);
    	}, Constants.TARGET_SERVER_DELTA_MS);
    }
    /**
     * Stops the game clock
     */
    stopClock() {
        if (this.loopID > 0)
            gameloop.clearGameLoop(this.loopID);
    }
    /**
     * Returns the game clock
     * @return {number} the current game clock
     */
    getGameClock() {
        return this.gameClock;
    }
    /**
     * Returns the current game tick
     * @return {number} the current game tick
     */
    getGameTick() {
        return this.gameTick;
    }
}

module.exports = BaseGame;