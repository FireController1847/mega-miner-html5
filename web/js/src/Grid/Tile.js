/**
 * A mathematical square that contains the position of itself on a generated grid.
 */
class Tile {
    /**
     * @param {number} gX The tile's x position relative to a grid.
     * @param {number} gY The tile's y position relative to a grid.
     */
    constructor(gX, gY) {
        this.gX = gX;
        this.gY = gY;
    }
}

module.exports = Tile;