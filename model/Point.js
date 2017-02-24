/**
 * Point.js
 * Fahid Jarmache
 * A class to hold a location in 2D space
 */

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * Returns a new point at the origin.
     */
    static ZERO() {
        return new Point(0, 0);
    }
}

module.exports = Point;