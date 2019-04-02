const Tile = require("../Grid/Tile.js");
const MapTile = require("./MapTile.js");
const Sprite = require("../Sprite.js");

/**
 * Handles and creates all tiles relating to the map itself.
 * Also handles map generation.
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
        this.grid = this.game.spriteHandler.grid;

        /**
         * Determines the maximum position vertically that the tiles will be generated (in grid units).
         */
        this.horizonLineGU = 8;

        /**
         * Determines the maximum position vertically that tiles will be generated.
         * @type {number}
         */
        this.horizonLine = this.horizonLineGU * this.grid.tileSize;

        /**
         * A list of tiles used in the background.
         * @type {Map<Tile, MapTile>}
         */
        this.bg_tiles = new Map();

        /**
         * A list of tiles used in the foreground (where the player is).
         * @type {Map<Tile, MapTile>}
         */
        this.tiles = new Map();
    }

    /**
     * Generates a new map.
     */
    generate() {
        // Generate First Grass Layer
        for (let i = 0; i < this.grid.width; i++) {
            const t = new Tile(i, this.horizonLineGU);
            const mt = new MapTile(this, t, "img", {});
            mt.make();
            this.game.addChild(mt);
            this.tiles.set(t, mt);
        }

        this.game.update();
    }

    /**
     * Re-positions the elements within the map to ensure they're in the right order.
     */
    relayer() {
        
    }
}

module.exports = GameMap;