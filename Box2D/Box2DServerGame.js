/**
 * Box2DServerGame.js
 * Fahid Jarmache
 * A class that extends the abstract ServerGame and provides Box2D physics.
 * ABSTRACT
 */

const debug = require("debug")("saerfim:ServerGame::Box2DServerGame");
const ServerGame = require("../core/ServerGame");
const Box2D = require("box2d-native");
const Constants = require("../model/Constants");

class Box2DServerGame extends ServerGame {
    constructor() {
        super();
        this.world = null;
        this.setupBox2D();
    }
    /**
     * setupBox2D
     * Sets 
     */
    setupBox2D() {
        this.world = new Box2D.b2World(new Box2D.b2Vec2(0, 100)); // TODO , size...
        //this.world.SetWarmStarting(true); // Testing?? 
    }
    /**
     * tick
     * Runs our Box2D simulation
     */
    tick(deltaTime) {
        var accumulatedStepTime = 0;
        while (accumulatedStepTime < deltaTime) {
            // ClearForces?

            var step = Math.min(deltaTime - accumulatedStepTime, Constants.Box2D.TIMESTEP);
            this.world.Step(step, step * Constants.BOX2D.VELOCITY_ITERATIONS, step * Constants.BOX2D.POSITION_ITERATIONS);

            accumulatedStepTime += step;
        }
        super.tick(delta);
    }
}

module.exports = Box2DServerGame;