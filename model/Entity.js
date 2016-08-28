/**
 * Entity.js
 * Fahid Jarmache
 * Represents an entity that lives on the server.
 */
'use strict';

const Point = require("./Point");

class Entity {
    constructor(entityID, clientID) {
        this.entityID = entityID;
        this.clientID = clientID;
        this.rotation = 0;
        this.position = Point.ZERO();
    }
    /**
     * Updates the entity's position, rotation among other internals.
     */
    updateEntity(gameClock, gameTick) {
        // override
    }
    /**
     * distanceFrom
     * Calculates the distance between two entities.
     * @return {number} the distance in pixels
     */
    distanceFrom(entity) {
        return 0;
    }
}