/**
 * ClientConnection.js
 * Fahid Jarmache
 */
'use strict';

const debug = require("debug")("saerfim:ClientConnection");

class ClientConnection {
    constructor(instance) {
        if (instance.onConnect === undefined) {
            throw("(ClientConnection) missing this.onConnect");
        }
        return this;
    }

}