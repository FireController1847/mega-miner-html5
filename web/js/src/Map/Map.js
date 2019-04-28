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
         * A list of tiles used in the foreground (supposedly the same layer as the player).
         * @type {Object.<string, MapTile>}
         */
        this.fg_tiles = {};

        /**
         * A container used to decrease rendering for each tile.
         * @type {createjs.Container}
         */
        this.tiles = new createjs.Container();
    }

    /**
     * Generates a new map.
     */
    generate() {
        // Generate Background
        const bgdirt = new createjs.Shape();
        bgdirt.graphics.beginBitmapFill(this.game.loadingHandler.sprites.bgdirt.image).drawRect(0, this.horizonLine, this.grid.widthGU * this.grid.tileSize, (this.grid.heightGU * this.grid.tileSize) - this.horizonLine);
        this.game.addChild(bgdirt);

        // Generate Background Grass Layer
        for (let i = 0; i < this.grid.widthGU; i++) {
            const t = new Tile(i, this.horizonLineGU);
            // Background Grass Tile
            const bggt = new MapTile(this, t, "bggrass", {});
            bggt.make();
            this.game.addChild(bggt);
        }

        // Generate First Grass Layer
        for (let i = 0; i < this.grid.widthGU; i++) {
            const t = new Tile(i, this.horizonLineGU);
            const mt = new Grass(this, t);
            mt.make();
            this.tiles.addChild(mt);
            this.fg_tiles[t.toString()] = mt;
        }

        // Generate Dirt
        for (let gY = this.horizonLineGU + 1; gY < this.grid.heightGU; gY++) {
            for (let gX = 0; gX < this.grid.widthGU; gX++) {
                const t = new Tile(gX, gY);
                const mt = new Dirt(this, t);
                mt.make();
                this.tiles.addChild(mt);
                this.fg_tiles[t.toString()] = mt;
            }
        }
        this.tiles.cache(0, 0, this.grid.width, this.grid.height);
        this.game.addChild(this.tiles);

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