/**
 * Box2DEntity.js
 * Fahid Jarmache
 */
const debug = require("debug")("saerfim:Entity::Box2DEntity");
const Entity = require("../model/Entity");
const Constants = require("../model/Constants");
class Box2DEntity extends Entity {
    constructor(entityID, clientID) {
        super(entityID, clientID);
        this.b2Body = null;
    }
    /**
     * updateEntity
     * Overriden method of Entity, updates our variables from our box2D simulation.
     */
    updateEntity() {
        if(!b2Body) {
            debug("Attempted to update position without a b2Body, ignoring...");
            return;
        }
        this.position.x = this.b2Body.GetPosition().x * Constants.BOX2D.MP_SCALE;
        this.position.y = this.b2Body.GetPosition().y * Constants.Box2D.MP_SCALE;
        this.rotation = this.b2Body.GetAngle();
    }
    /**
     * getBox2DBody
     * Returns the b2Body of the entity
     */
    getBox2DBody() {
        return this.b2Body;
    }
    /**
     * setBox2DBody
     * Sets the b2Body of the entity
     */
    setBox2DBody(b2DBody) {
        this.b2Body = b2DBody;
    }
}

module.exports = Box2DEntity;