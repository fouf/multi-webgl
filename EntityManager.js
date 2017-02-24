/**
 * EntityManager.js
 * Fahid Jarmache
 * Manages all the entities for the server and client.
 */

class EntityManager {
    constructor() {
        this.entities = new Map();
        this.players = new Map();
    }
    /**
     * tick
     * Updates our entities based on the game clock and tick. ??
     * TODO: Add speed factor?
     */
    tick(gameClock, gameTick) {
    }
    /**
     * addEntity
     * Adds an entity.
     */
    addEntity(entity) {
        this.entities.set(entity.entityID, entity);
    }
    /**
     * removeEntity
     * Removes the entity with the given ID.
     */
    removeEntity(entityID) {
        //var entity = this.entities.get(entityID);
        // entity.cleanup() ??
        this.entities.remove(entity);
    }
    /**
     * updateEntity
     * This will be called by the client game to update entities received from the server.
     * Entities will be lerped to their most up-to-date positions.
     */
    updateEntity(entityID, newData) {

    }
    /**
     * 
     */
    addPlayer(playerEntity) {
        // TODO: check clientID against serverID (-1?)
        this.addEntity(playerEntity);
        this.players.set(playerEntity.clientID, playerEntity);
    }
    /**
     * Removes a player's entity, and the player.
     */
    removePlayer(clientID) {
        var player = this.players.get(clientID);
        if (!player) {
            debug("::removePlayer entity not found with key " + clientID + ", ignoring");
            return;
        }
        this.removeEntity(player.entityID);
        this.players.delete(clientID);

    }
    /**
     * getEntities
     * Returns the entity map
     */
    getEntities() {
        return this.entities;
    }
}

module.exports = EntityManager;