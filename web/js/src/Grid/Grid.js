const { Borders } = require("../ShapeUtil.js");
const Tile = require("./Tile.js");

/**
 * Contains the mathematical positions of 'tiles' in the form of a grid.
 */
class Grid {
    /**
     * @param {import("../Game.js")} game The game
     * @param {number} tileSize The size of each tile in pixels. (can only be squares).
     * @param {number} width The amount of horizontal tiles to create.
     * @param {number} height The amount of vertical tiles to create.
     */
    constructor(game, tileSize, width, height) {
        this.game = game;
        createjs.Ticker.addEventListener("tick", this.tick.bind(this));

        /**
         * The size of each tile in pixels.
         * @type {number}
         */
        this.tileSize = tileSize;

        /**
         * The amount of horizontal tiles to create.
         * @type {number}
         */
        this.width = width;

        /**
         * The amount of vertical tiles to create.
         * @type {number}
         */
        this.height = height;

        /**
         * The borders of this grid.
         * @type {Borders}
         */
        this.borders = new Borders(0, 0, this.height * this.tileSize, this.width * this.tileSize);

        /**
         * A list of each tile in this grid.
         * @type {Array<Tile>}
         */
        this.tiles = [];

        /**
         * Whether or not to recreate this grid.
         * @type {boolean}
         */
        this.recreate = true;

        /**
         * A list of tiles for the overlay. Gets destroyed when grid is disabled after being enabled.
         * @type {Array<Tile>}
         */
        this.overlayTiles = [];

        /**
         * Whether or not to show the grid overlay. If changed, must ask for a redraw.
         * @example
         *  grid.showGridOverlay = true;
         *  grid.redraw = true;
         * @type {boolean}
         */
        this.showGridOverlay = false;
    }

    /**
     * Create a bunch of tiles with their repsective pixel-to-grid position.
     */
    create(overlay = false) {
        let gX = 0;
        let gY = 0;

        for (let y = 0; y < this.borders.bottom; y += this.tileSize) {
            for (let x = 0; x < this.borders.right; x += this.tileSize) {
                if (overlay) {
                    // Determines the center and then draws a checkerboard
                    // by changing the color of each tile.
                    let color;
                    if ((Math.round(this.height / 2) == (gY + 1)) &&
                    (Math.round(this.width / 2) == (gX + 1))) {
                        color = "rgba(255, 0, 0, 0.25)";
                    } else if (gY % 2 <= 0 && gX % 2 <= 0) {
                        color = "rgba(255, 255, 255, 0.25)";
                    } else if (gY % 2 > 0 && gX % 2 <= 0) {
                        color = "rgba(0, 0, 0, 0.25)";
                    } else if (gY % 2 <= 0 && gX % 2 > 0) {
                        color = "rgba(0, 0, 0, 0.25)";
                    } else {
                        color = "rgba(255, 255, 255, 0.25)";
                    }

                    const tile = new createjs.Shape();
                    tile.graphics.beginFill(color).drawRect(x, y, this.tileSize, this.tileSize);
                    this.game.addChild(tile);
                    this.overlayTiles.push(tile);
                } else {
                    const tile = new Tile(gX, gY);
                    this.tiles.push(tile);
                }
                gX++;
            }
            gY++;
            gX = 0;
        }
        if (overlay) this.game.update();
    }

    /**
     * Toggles the grid overlay.
     */
    toggleOverlay() {
        if (this.showGridOverlay) {
            this.showGridOverlay = false;
            for (let i = 0; i < this.overlayTiles.length; i++) this.game.removeChild(this.overlayTiles[i]);
            this.overlayTiles.length = 0;
        } else {
            this.showGridOverlay = true;
            this.create(true);
        }
    }

    /**
     * Calls a tick for this grid (based on the EaselJS Ticker).
     */
    tick() {
        if (this.recreate) {
            this.recreate = false;
            for (let i = 0; i < this.tiles.length; i++) this.game.removeChild(this.tiles[i]);
            this.tiles.length = 0;
            this.create();
        }
    }
}

module.exports = Grid;