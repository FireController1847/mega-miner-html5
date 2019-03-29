const { Borders } = require("../ShapeUtil.js");
const Tile = require("./Tile.js");
const ITick = require("../ITick.js");

class Grid extends ITick {
    /**
     * Contains and manages many shapes in the form of a Grid.
     *
     * @param {createjs.Stage} stage The EaselJS Stage.
     * @param {number} tileSize The size of each tile (can only be squares).
     * @param {number} width The amount of horizontal tiles to create.
     * @param {number} height The amount of vertical tiles to create.
     */
    constructor(stage, tileSize, width, height) {
        super();
        this.stage = stage;

        /**
         * The type of tile constructor to use.
         */
        this.Tile = Tile;

        /**
         * The size of each tile.
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
         * Whether or not to redraw the grid. **WARNING: REPLACES ALL TILES!**
         * @type {boolean}
         */
        this.redraw = true;

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
    draw(overlay = false) {
        let gX = 0;
        let gY = 0;
        for (let y = 0; y < this.height * this.tileSize; y += this.tileSize) {
            for (let x = 0; x < this.width * this.tileSize; x += this.tileSize) {
                const tile = new Tile(gX, gY);
                let color;

                // Determines the center, and then draws a checkerboard by changing the color of the tile.
                // WARNING: Currently overrides and re-creates every tile! If I want this to be a sprite grid,
                //          I need to create an entirely separate grid for this!
                if (overlay) {
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
                }

                if (overlay) {
                    this.overlayTiles.push(tile);
                } else {
                    this.tiles.push(tile);
                }
                tile.make(x + this.borders.left, y + this.borders.top, this.tileSize, color);
                this.stage.addChild(tile);
                gX++;
            }
            gY++;
            gX = 0;
        }
        this.stage.update();
    }

    /**
     * Toggles the grid overlay.
     */
    toggleOverlay() {
        if (this.showGridOverlay) {
            this.showGridOverlay = false;
            for (let i = 0; i < this.overlayTiles.length; i++) this.stage.removeChild(this.overlayTiles[i]);
            this.overlayTiles.length = 0;
        } else {
            this.showGridOverlay = true;
            this.draw(true);
        }
    }

    /**
     * Calls a tick for this grid (based on the EaselJS Ticker).
     */
    tick() {
        if (this.redraw) {
            this.redraw = false;
            for (let i = 0; i < this.tiles.length; i++) this.stage.removeChild(this.tiles[i]);
            this.tiles.length = 0;
            this.draw();
        }
    }
}

module.exports = Grid;