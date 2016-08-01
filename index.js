'use strict';

const express = require('express');
const app = express();
const path = require('path');
const debug = require('debug')('saerfim:index');

const server = require('http').createServer(app);
require('./server')(server);
app.use(express.static(path.join(__dirname, 'static')));
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

server.listen(8080, function () {
	debug('Listening on 8080');
});
