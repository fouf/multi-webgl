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
const Box2DEntity = require("./Box2DEntity");

class Box2DServerGame extends ServerGame {
	constructor(server) {
		super(server);
		this.world = null;
		this.setupBox2D();
	}
	/**
	 * setupBox2D
	 * Initializes our Box2D world.
	 */
	setupBox2D() {
		this.world = new Box2D.b2World(new Box2D.b2Vec2(0, 0)); // No gravity
		//this.world.SetWarmStarting(true); // Testing?? 
		debug("::setupBox2D box2D world initalized");
		//this.createBox();
	}
	/**
	 * tick
	 * Runs our Box2D simulation
	 */
	tick(deltaTime) {
		var accumulatedStepTime = 0;
		while (accumulatedStepTime < deltaTime) { // Run many small steps instead of one large one. Keeps the simulation more consistent and stable.
			// Should we ClearForces? this.world.ClearForces();

			var step = Math.min(deltaTime - accumulatedStepTime, Constants.BOX2D.TIMESTEP);
			this.world.Step(step, step * Constants.BOX2D.VELOCITY_ITERATIONS, step * Constants.BOX2D.POSITION_ITERATIONS);

			accumulatedStepTime += step;
		}
		super.tick(deltaTime);
	}
	/**
	 * createBox
	 * Creates a box in our Box2D world.
	 */
	createBox(id) {
		var fixtureDef = new Box2D.b2FixtureDef();
		fixtureDef.shape = new Box2D.b2CircleShape();
		fixtureDef.shape.radius = 5;
		fixtureDef.friction = 0.4;
		fixtureDef.restituon = 0.6;
		fixtureDef.density = 1.0;

		var ballBd = new Box2D.b2BodyDef();
		ballBd.type = Box2D.b2_dynamicBody;
		ballBd.position.Set(Math.random() * (750 - 50) + 50, Math.random() * (550 - 50) + 50);
		var body = this.world.CreateBody(ballBd);
		body.CreateFixture(fixtureDef);

		// Create the entity for it in RealTimeMultiplayerNodeJS
		var box2DEntity = new Box2DEntity(this.getNextEntityID(), id); 
		box2DEntity.setBox2DBody(body);
		this.entityManager.addEntity(box2DEntity);
		// TODO ENTITY TYPE aBox2DEntity.entityType = DemoBox2D.Constants.ENTITY_TYPES.CIRCLE;, etc
	}

	createPlayerEntity(clientID) {
		debug("Creating entity for client: " + clientID);
		this.createBox(clientID);
	}

	handleEntityAction(clientID, dir) {
		this.entityManager.getEntities().forEach(function(entity, key) {
			if (entity.clientID === clientID) {
				debug("Found our entity.");
				var vel = entity.b2Body.GetLinearVelocity();
				switch (dir) {
					case "up":
						//debug("Up received.");
						if (vel.y < 0)
							entity.b2Body.SetLinearVelocity(new Box2D.b2Vec2(vel.x, 0));
						else
							entity.b2Body.SetLinearVelocity(new Box2D.b2Vec2(vel.x, -50));
						break;
					case "down":
						//debug("Down received.");
						if (vel.y > 0)
							entity.b2Body.SetLinearVelocity(new Box2D.b2Vec2(vel.x, 0));
						else
							entity.b2Body.SetLinearVelocity(new Box2D.b2Vec2(vel.x, 50));
						break;
					case "left":
						//debug("Left received.");
						if (vel.x < 0)
							entity.b2Body.SetLinearVelocity(new Box2D.b2Vec2(0, vel.y));
						else
							entity.b2Body.SetLinearVelocity(new Box2D.b2Vec2(-50, vel.y));
						break;
					case "right":
						//debug("Right received.");
						if (vel.x > 0)
							entity.b2Body.SetLinearVelocity(new Box2D.b2Vec2(0, vel.y));
						else
							entity.b2Body.SetLinearVelocity(new Box2D.b2Vec2(50, vel.y));
						break;
				}
			}
			return;
		});
	}
}

module.exports = Box2DServerGame;
