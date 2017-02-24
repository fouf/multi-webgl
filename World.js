/**
 * World.js
 * Fahid Jarmache
 * Represents the game world.
 */
'use strict';

var debug = require("debug")("saerfim:world");
var QuadTree = require("simple-quadtree");
var Entity = require("./Entity");
var WorldSnapshot = require("./WorldSnapshot");

class World {
    // Initializes the quad-tree.
    constructor(x, y, width, height) {
        this.qt = QuadTree(0, 0, width, height);
        this.entities = [];
        this.gameTick = 0;
        debug("World initialized with top-left position [" + x +  "," + y + "] with width and height of " + width + ", " + height + " respectively.");
        this.addEntity(new Entity(0, 0, 0, 5, 5));
    }

    // Adds an entity to the world, and the quadtree.
    addEntity(entity) {
        this.entities.push(entity);
        this.qt.put(entity);
        debug("Added an entity to the world: " + entity.toString());
    }
    
    update(deltaTime) {
        // Update all of the entities we have.
        this.entities.forEach(function(entity) {
            entity.update(deltaTime);
            this.qt.update(entity, 'id', { x: entity.x, y: entity.y, xVel: entity.xVel, yVel: entity.yVel });
        }, this);
    }

}

module.exports = World;
