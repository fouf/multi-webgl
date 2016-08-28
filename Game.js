/**
 * Game.js
 * Fahid Jarmache
 */

'use strict';

const debug = require("debug")("saerfim:game");
const gameloop = require("node-gameloop");
const Box2D = require("box2d-native");
const World = require("./World");
const Constants = require("./Constants");
const BaseGame = require("./abstract/BaseGame");

class Game {
    constructor() {
        this.gameTick = 0;
        this.gameClock = 0;
	    //this.ourWorld = new World(0, 0, 100, 100);

        this.setupBox2D();
        debug("Game initialized.");
    }
    
    run() {
        var that = this;
        gameloop.setGameLoop(function(delta) {
            // handle entities
		    //that.ourWorld.update(delta);
            // Handle clocks / ticks

            that.ourWorld.Step(delta, Constants.BOX2D.VELOCITY_ITERATIONS * delta, Constants.BOX2D.POSITION_ITERATIONS * delta);
            
            that.gameClock += delta; // Increase our game tick by our change in time since last frame
            that.gameTick++;
    	}, Constants.TARGET_SERVER_DELTA_MS);

    }
    /**
     * setupBox2D
     * Setup our Box2D world
     * TODO
     */
    setupBox2D() {
        this.ourWorld = new Box2D.b2World(new Box2D.b2Vec2(0, 10));
    }

}
module.exports = Game;