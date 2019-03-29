class Tile extends createjs.Shape {
    /**
     * A square that contains the position of itself on a grid.
     *
     * @param {number} gX The tile's x position relative to a grid.
     * @param {number} gY The tile's y position relative to a grid.
     * @param  {...any} args Other Shape Arguments
     */
    constructor(gX, gY, ...args) {
        super(...args);

        this.gX = gX;
        this.gY = gY;
    }

    /**
     * Actually calls the required methods to create the canvas defintions for this shape.
     *
     * @param {number} x The horizontal pixel position.
     * @param {number} y The vertical pixel position.
     * @param {number} size The size of this tile (tiles can only be square).
     * @param {?string} color A string containing an EaselJS Shape-Compatible color.
     */
    make(x, y, size, color = "transparent") {
        this.graphics.beginFill(color).drawRect(x, y, size, size);
    }
}

module.exports = Tile;