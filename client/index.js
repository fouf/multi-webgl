'use strict';

require('pixi');
require('p2');
require('phaser');

const Player = require('./Player');
const Entity = require("./Entity");

var socket = io('http://localhost:8080');
const players = {};
var connected = false;

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
socket.on("snapshots", function(data)  {
	console.log(data);
});

socket.emit("auth");
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create });

function create() {

	var text = "lol";
	var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

	var t = game.add.text(game.world.centerX - 300, 0, text, style);
	var e = new Entity();
}
