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
     * @param {MapTileProperties} properties Contains the properties of this maptile.
     */
    constructor(map, tile, appearance, properties) {
        super();

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
         * @type {MapTileProperties}
         */
        this.properties = properties;

        /**
         * Contains the image id used to determine this maptile's appearance.
         * @type {string}
         */
        this.appearance = appearance;
    }

    /**
     * Creates this maptile to be ready to be displayed.
     */
    make() {
        const sprite = this.map.game.loadingHandler.sprites[this.appearance];
        this.image = sprite.image;
        this.setTransform(
            this.tile.gX * this.map.grid.tileSize,
            this.tile.gY * this.map.grid.tileSize,
            this.map.grid.tileSize / this.image.width,
            this.map.grid.tileSize / this.image.height
        );
    }
}
/**
 * Determines the different tile types.
 * @readonly
 * @enum {number}
 */
MapTile.Types = {
    DIRT: 0
};

/**
 * Contains information about the tile such as thickness, value, and more.
 * @typedef {Object} MapTileProperties
 * @property {MapTile.Types} type The type of tile this is.
 * @property {number} tickness Determines the speed at which the player moves in this tile (in pixels per frame).
 * @property {number} value The value of this tile.
 */

module.exports = MapTile;