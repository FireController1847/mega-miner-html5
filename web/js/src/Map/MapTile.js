/** @typedef {import("../Grid/Tile.js")} Tile */
/** @typedef {import("./Map.js")} Map */

/**
 * Used for the player and game to determine if the tile is breakable, where it should be placed, and how the game should react to it.
 */
class MapTile extends createjs.Bitmap {
    /**
     * @param {Map} map The map that created this tile.
     * @param {Tile} tile Contains information about this maptile's position on the grid.
     * @param {string} appearance Contains the image id used to determine this maptile's appearance.
     * @param {Object.<String, any>} properties Contains the properties of this maptile.
     */
    constructor(map, tile, appearance, properties) {
        super(map.game.displayHandler);

        /**
         * The map that created this tile.
         * Contains a reference to the game.
         * @type {Map}
         */
        this.map = map;

        /**
         * Contains information about this maptile's position on the grid.
         * @type {Tile}
         */
        this.tile = tile;

        /**
         * Contains the properties of this maptile.
         * Used by the player and game to determine how to react to this tile.
         * @type {Object.<String, any>}
         */
        this.properties = properties;

        /**
         * Contains the image id used to determine this maptile's appearance.
         * @type {string}
         */
        this.appearance = appearance;
    }

    make() {
        // TODO: Make more versatile.
        const sprite = this.map.game.loadingHandler.sprites[this.appearance];
        this.image = sprite.image;
        this.scaleX = 50 / 64;
        this.scaleY = 50 / 64;
        this.x = this.tile.gX * this.map.grid.tileSize;
        this.y = this.tile.gY * this.map.grid.tileSize;
        // this.drawImageRect(this.map.game.images[this.appearance], this.tile.gX * this.map.grid.tileSize, this.tile.gY * this.map.grid.tileSize, 50, 50);
        // this.graphics.beginBitmapFill(image).drawRect(x, y, width, height);
    }
}

module.exports = MapTile;