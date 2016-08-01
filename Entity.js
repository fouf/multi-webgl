'use strict';

class Entity {
	// constructor for entity
	// x, y coordinates. w, h are width and height respectively.
	constructor(id, x, y, w, h) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.xVel = 1;
		this.yVel = 0;
		this.dirty = true;
	}

	update(deltaTime) {
		if(this.xVel !== 0 || this.yVel !== 0) {
			this.dirty = true;
			this.x += this.xVel;
			this.y += this.yVel;
		}
	}

	toString() {
		return "Entity[" + this.id + "]";		
	}
}

module.exports = Entity;