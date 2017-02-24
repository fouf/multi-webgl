'use strict';

require('pixi');
require('p2');
require('phaser');

const ClientGame = require("../core/ClientGame");
const Player = require('./Player');
const Entity = require("./Entity");

var socket = io();
const players = {};
var connected = false;

//var c = new ClientGame();

var entities = new Map();

var upKey, downKey, leftKey, rightKey;

socket.on("connect", function() {
	console.log("Successfully connected to server");
	connected = true;
});

socket.on("player", function(data) {
	console.log("Received a player...");
	const player = new Player(data);
	players[player.id] = player;
	console.log("Player id: " + player.id);
});
socket.on("snapshots", function(snapshots)  {
	for (let snapshotBuffer of snapshots.buffer) {
		for (let entity of snapshotBuffer.entities) {
			var localEntity = entities.get(entity.entityID);
			if (localEntity !== undefined) { // update
				localEntity.body.x = entity.position.x;
				localEntity.body.y = entity.position.y;
				localEntity.body.velocity.x = entity.velocity.x;
				localEntity.body.velocity.y = entity.velocity.y;
				//localEntity.body.angle = entity.rotation;
			} else {
				// creation
				var ourEntity = game.add.sprite(entity.position.x, entity.position.y, 'ex');
				ourEntity.ID = entity.entityID;
				entities.set(ourEntity.ID, ourEntity);
				game.physics.box2d.enable(ourEntity);
				console.log("added new entity: pos " + entity.position.x + " " + entity.position.y + " id: " + ourEntity.ID);
			}
		}
	}

});

socket.emit("auth");
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });
function preload() {
	game.load.image('ex', './ex.png');
	game.physics.startSystem(Phaser.Physics.BOX2D);
}

function create() {

	var text = "phaser/box2d server-client test";
	var style = { font: "32px Arial", fill: "#ff0044", align: "center" };

	var t = game.add.text(game.world.centerX - 300, 0, text, style);

	upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	upKey.onDown.add(upKeyEvent, this);
	upKey.onUp.add(upKeyEvent, this);

	downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	downKey.onDown.add(downKeyEvent, this);
	downKey.onUp.add(downKeyEvent, this);

	leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	leftKey.onDown.add(leftKeyEvent, this);
	leftKey.onUp.add(leftKeyEvent, this);

	rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	rightKey.onDown.add(rightKeyEvent, this);
	rightKey.onUp.add(rightKeyEvent, this);

	socket.connect("localhost:8080");
}
function update() {
}

function upKeyEvent() {
	socket.emit("move", "up");
}
function downKeyEvent() {
	socket.emit("move", "down");
}
function leftKeyEvent() {
	socket.emit("move", "left");
}
function rightKeyEvent() {
	socket.emit("move", "right");
}
