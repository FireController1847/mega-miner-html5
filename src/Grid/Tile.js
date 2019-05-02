/**
 * A mathematical shape that contains the position of itself on a generated grid.
 */
class Tile {
    /**
     * @param {number} gX The tile's x position relative to a grid.
     * @param {number} gY The tile's y position relative to a grid.
     */
    constructor(gX, gY) {
        /**
         * This tile's x position relative to a grid.
         * @type {number}
         */
        this.gX = gX;

        /**
         * This tile's y position relative to a grid.
         * @type {number}
         */
        this.gY = gY;
    }

    toString() {
        return `${this.gX}-${this.gY}`;
    }
}

module.exports = Tile;