/**
 * Constants.js
 * Fahid Jarmache
 */
'use strict';

const Constants = {

    BOX2D: {
        VELOCITY_ITERATIONS: 800,
        POSITION_ITERATIONS: 300,
        TIMESTEP: 0.016,
    },
    SERVER: {
        FIRST_CLIENT_ID: 0,
        SERVER_ID: -1,
        TARGET_SERVER_DELTA_MS: 1000 / 30,
        SNAPSHOT_UPDATE_RATE: 0.1, // Send client snapshots every Xms
    },

};
module.exports = Constants;