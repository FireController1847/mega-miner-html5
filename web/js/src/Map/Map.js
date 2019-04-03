/** @typedef {import("./MapTile.js")} MapTile */
const Tile = require("../Grid/Tile.js");
const MapTile = require("./MapTile.js"); // eslint-disable-line
const Grass = require("./Tiles/Grass.js");
const Dirt = require("./Tiles/Dirt.js");

/**
 * Handles and creates all tiles relating to the map itself. Also handles map generation among various other map-related things.
 */
class GameMap {
    /**
     * @param {import("../Game.js")} game The game.
     */
    constructor(game) {
        this.game = game;

        /**
         * A reference to the sprite grid for utility purposes.
         * @type {import("../Grid/Grid.js")}
         */
        this.grid = this.game.displayHandler.grid;

        /**
         * Determines the maximum position vertically that the tiles will be generated (in grid units).
         * @type {number}
         */
        this.horizonLineGU = 8;

        /**
         * Determines the maximum position vertically that tiles will be generated (in pixels).
         * @type {number}
         */
        this.horizonLine = this.horizonLineGU * this.grid.tileSize;

        /**
         * A list of tiles used in the background.
         * TODO: Determine if needed. Might not be needed if we can fill a shape with the bitmap
         *  instead of creating individual tiles for the background, as they're never interacted with.
         * @type {Map<Tile, MapTile>}
         */
        this.bg_tiles = new Map();

        /**
         * A list of tiles used in the foreground (supposedly the same layer as the player).
         * @type {Object.<string, MapTile>}
         */
        this.tiles = {};
    }

    /**
     * Generates a new map.
     */
    generate() {
        // Generate First Grass Layer
        for (let i = 0; i < this.grid.width; i++) {
            const t = new Tile(i, this.horizonLineGU);
            const mt = new Grass(this, t);
            mt.make();
            this.game.addChild(mt);
            this.tiles[t.toString()] = mt;
        }

        // Generate Dirt
        for (let gY = this.horizonLineGU + 1; gY < this.grid.height; gY++) {
            for (let gX = 0; gX < this.grid.width; gX++) {
                const t = new Tile(gX, gY);
                const mt = new Dirt(this, t);
                mt.make();
                this.game.addChild(mt);
                this.tiles[t.toString()] = mt;
            }
        }

        this.game.update();
    }

    /**
     * Re-positions the elements within the map to ensure they're in the right order.
     */
    relayer() {
        // ...
    }
}

module.exports = GameMap;