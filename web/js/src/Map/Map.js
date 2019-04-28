/** @typedef {import("./MapTile.js")} MapTile */
const Tile = require("../Grid/Tile.js");
const MapTile = require("./MapTile.js"); // eslint-disable-line
const seedrandom = require("seedrandom");

// Tiles
const Grass = require("./Tiles/Grass.js");
const Dirt = require("./Tiles/Dirt.js");
const Coal = require("./Tiles/Coal.js");

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
         * An array of "tiles" used in the background.
         * @type {Array<createjs.Container|createjs.Shape|createjs.Bitmap}>}
         */
        this.bg_tiles = [];

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

        /**
         * A randomly generated number depending on the EPOCH timestamp to determine the randomness of this map.
         * @type {number}
         */
        this.seed = 0;
    }

    /**
     * Generates a new map.
     */
    generate(seed) {
        // Set & Create a Seed
        this.seed = seed || Date.now();
        seedrandom(this.seed, { global: true });

        // Generate Background
        const bgdirt = new createjs.Shape();
        bgdirt.graphics.beginBitmapFill(this.game.loadingHandler.sprites.bgdirt.image).drawRect(0, this.horizonLine, this.grid.widthGU * this.grid.tileSize, (this.grid.heightGU * this.grid.tileSize) - this.horizonLine);
        this.bg_tiles.push(bgdirt);
        this.game.addChild(bgdirt);

        // Generate Background Grass Layer
        const bggrass = new createjs.Container();
        for (let i = 0; i < this.grid.widthGU; i++) {
            const t = new Tile(i, this.horizonLineGU);
            // Background Grass Tile
            const bggt = new MapTile(this, t, "bggrass", {});
            bggt.make();
            bggrass.addChild(bggt);
        }
        bggrass.cache(0, this.horizonLine, this.grid.width, this.grid.tileSize);
        this.bg_tiles.push(bggrass);
        this.game.addChild(bggrass);

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
        this.tiles.cache(0, this.horizonLine, this.grid.width, this.grid.height);
        this.game.addChild(this.tiles);

        // Temporary variable to determine which layer we're on.
        let layer = 0;

        // Generate Coal Layer (Layer Only Contains Coal)
        layer = 1;
        for (let gX = 0; gX < this.grid.widthGU; gX++) {
            for (let gY = this.horizonLineGU + 1; gY < this.horizonLineGU + 21; gY++) {
                const t = new Tile(gX, gY);
                if (this.shouldGenType("coal", layer, t)) this.genType(Coal, t);
            }
        }

        this.game.displayHandler.relayer();
        this.tiles.updateCache();
        this.game.update();
    }

    /**
     * Determines whether or not the item should be generated or not
     * Includes chance values, so < 7.5 is the same as 7.5%
     * @param {string} type
     * @param {number} layer
     * @param {Tile} tile 
     */
    shouldGenType(type, layer, tile) {
        switch (type) {
            case "coal": {
                if (layer == 1) {
                    if (Math.random() * 100 <= 7.5) return true;
                    else return false;
                }
                break;
            }
            default: {
                return false;
            }
        }
    }

    /**
     * Actually generates the tile.
     * @param {Type} Type
     * @param {Tile} tile
     */
    genType(Type, tile) {
        const mt = new Type(this, tile);
        mt.make();
        const ts = tile.toString();
        if (this.fg_tiles[ts]) this.tiles.removeChild(this.fg_tiles[ts]);
        this.fg_tiles[ts] = mt;
        this.tiles.addChild(mt);
    }

    /**
     * Un-generates the map.
     */
    ungenerate() {
        this.seed = 0;

        this.bg_tiles.forEach(i => {
            if (i.hasOwnProperty("removeAllChildren")) i.removeAllChildren();
            this.game.removeChild(i);
        });
        this.fg_tiles = [];
        this.tiles.removeAllChildren();
        this.tiles.updateCache();
        this.game.displayHandler.relayer();
    }

    /**
     * Re-positions the elements within the map to ensure they're in the right order. Used for relayering.
     */
    bringToFront() {
        for (let i = 0; i < this.bg_tiles.length; i++) {
            this.game.setChildIndex(this.bg_tiles[i], this.game.children.length - 1);
        }
        this.game.setChildIndex(this.tiles, this.game.children.length - 1);
    }
}

module.exports = GameMap;