const { Borders } = require("../ShapeUtil.js");
const Tile = require("./Tile.js");

class Grid {
    /**
     * Contains and manages many shapes in the form of a Grid.
     *
     * @param {createjs.Stage} stage The EaselJS Stage.
     * @param {number} tileSize The size of each tile (can only be squares).
     * @param {number} width The amount of horizontal tiles to create.
     * @param {number} height The amount of vertical tiles to create.
     */
    constructor(stage, tileSize, width, height) {
        this.stage = stage;

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
         * Whether or not to show the grid overlay. If changed, must ask for a redraw.
         * @example
         *  grid.showGridOverlay = true;
         *  grid.redraw = true;
         * @type {boolean}
         */
        this.showGridOverlay = false;

        /**
         * Whether or not to redraw the grid.
         * @type {boolean}
         */
        this.redraw = true;
    }

    /**
     * Create a bunch of tiles with their repsective pixel-to-grid position.
     */
    draw() {
        let gX = 0;
        let gY = 0;
        for (let y = 0; y < this.height * this.tileSize; y += this.tileSize) {
            for (let x = 0; x < this.width * this.tileSize; x += this.tileSize) {
                const tile = new Tile(gX, gY);
                let color;

                // Determines the center, and then draws a checkerboard by changing the color of the tile.
                // WARNING: Currently overrides and re-creates every tile! If I want this to be a sprite grid,
                //          I need to create an entirely separate grid for this!
                if (this.showGridOverlay) {
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

                tile.make(x + this.borders.left, y + this.borders.top, this.tileSize, color);
                this.tiles.push(tile);
                this.stage.addChild(tile);
                gX++;
            }
            gY++;
            gX = 0;
        }
        this.stage.update();
    }

    /**
     * Calls a tick for this grid (based on the EaselJS Ticker).
     */
    tick() {
        if (this.redraw) {
            this.redraw = false;
            for (let i = 0; i < this.tiles.length; i++) this.stage.removeChild(this.tiles[i]);
            this.tiles.length = 0;
            console.log("GRID REDRAW!");
            this.draw();
        }
    }
}

module.exports = Grid;