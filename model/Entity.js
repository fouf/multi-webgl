/**
 * Entity.js
 * Fahid Jarmache
 * Represents an entity that lives on the server.
 * ABSTRACT
 */
'use strict';

const Point = require("./Point");

class Entity {
	constructor(entityID, clientID) {
		this.entityID = entityID; // The entity's ID
		this.clientID = clientID; // The entity's owner
		this.entityType = -1; // The entity's type
		this.rotation = 0;
		this.velocity = Point.ZERO();
		this.position = Point.ZERO();
	}
	/**
	 * Updates the entity's position, rotation among other internals.
	 */
	updateEntity(deltaTime, gameClock, gameTick) {
		// to be implemented by extended classes
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

module.exports = Entity;
