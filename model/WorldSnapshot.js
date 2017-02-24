/**
 * WorldSnapshot.js
 * Fahid Jarmache 
 */
'use strict';
class WorldSnapshot {
	/**
	 * instance, the game instance (servergame)
	 * entities, a map of all entities
	 */
	constructor(instance, entities) {
		this.instance = instance;
		this.entities = entities;
	}
	/**
	 * snap
	 * Create's a snapshot object from the world given.
	 */
		snap() {
				var snapshot = {};
				snapshot.gameClock = this.instance.getGameClock();
				snapshot.gameTick = this.instance.getGameTick();
				snapshot.entities = [];
				this.entities.forEach(function(value, key) {
						snapshot.entities.push({
								entityID: value.entityID,
								clientID: value.clientID,
								position: value.position,
								velocity: value.velocity,
								rotation: value.rotation
						});
				});
				return snapshot;
		}
}
module.exports = WorldSnapshot;
