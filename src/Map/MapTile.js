/** @typedef {import("../Grid/Tile.js")} Tile */
/** @typedef {import("./Map.js")} Map */

/**
 * Used for the player and game to determine if the tile is breakable, where it should be placed, and how the game should react to it.
 */
class MapTile extends createjs.Sprite {
    /**
     * @param {Map} map The map that created this tile.
     * @param {Tile} tile Contains information about this maptile's position on the grid.
     * @param {string} appearance Contains the image id used to determine this maptile's appearance.
     * @param {MapTileProperties} properties Contains the properties of this maptile.
     */
    constructor(map, tile, properties) {
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
    }

    /**
     * Creates this maptile to be ready to be displayed.
     */
    make() {
        this.spriteSheet = this.map.game.loadingHandler.sprites.tiles;
        this.gotoAndStop(this.properties.type);
        this.setTransform(
            this.tile.gX * this.map.grid.tileSize,
            this.tile.gY * this.map.grid.tileSize
        );
    }
}
/**
 * Determines the different tile types.
 * Used for fetching the image from the loader.
 * @readonly
 * @enum {number}
 */
MapTile.Type = {
    DIRT: 2,
    GRASS: 1,
    COAL: 6,
    BG_GRASS: 3
};

/**
 * Contains information about the tile such as thickness, value, and more.
 * @typedef {Object} MapTileProperties
 * @property {MapTile.Type} type The type of tile this is.
 * @property {number} thickness A percentage of the default player movement speed. See {@link Player#defaultSpeed}.
 * @property {number} value The value of this tile.
 * @see Player#defaultSpeed
 */

module.exports = MapTile;