const { Borders } = require("../ShapeUtil.js");
const Tile = require("./Tile.js");

/**
 * Contains the mathematical positions of 'tiles' in the form of a grid.
 */
class Grid {
    /**
     * @param {import("../Game.js")} game The game
     * @param {number} tileSize The size of each tile in pixels.
     * @param {number} width The amount of horizontal tiles to create.
     * @param {number} height The amount of vertical tiles to create.
     */
    constructor(game, tileSize, width, height) {
        this.game = game;

        /**
         * The size of each tile in pixels.
         * @type {number}
         */
        this.tileSize = tileSize;

        /**
         * The amount of horizontal tiles to create.
         * @type {number}
         */
        this.widthGU = width;

        /**
         * The amount of vertical tiles to create.
         * @type {number}
         */
        this.heightGU = height;

        /**
         * How wide the grid is in pixels.
         * @type {number}
         */
        this.width = this.widthGU * this.tileSize;

        /**
         * How tall the grid is in pixels.
         * @type {number}
         */
        this.height = this.heightGU * this.tileSize;

        /**
         * The borders of this grid.
         * @type {Borders}
         */
        this.borders = new Borders(0, 0, this.heightGU * this.tileSize, this.widthGU * this.tileSize);

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
         * A container for each tile of the overlay.
         * @type {createjs.Container}
         */
        this.overlayTiles = new createjs.Container();

        /**
         * Whether or not to show the grid overlay.
         * Should not be changed manually. Use `Grid#toggleOverlay` instead.
         * @type {boolean}
         */
        this.showGridOverlay = false;

        /**
         * Whether or not to run the tick event.
         * @type {boolean}
         */
        this.tickEnabled = true;

        createjs.Ticker.addEventListener("tick", this.tick.bind(this));
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
                    if ((Math.round(this.heightGU / 2) == (gY + 1)) &&
                    (Math.round(this.widthGU / 2) == (gX + 1))) {
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
                    this.overlayTiles.addChild(tile);
                } else {
                    // TODO: Is it nessecary to even do this or can we just keep this class without creating these "mathematical tiles"?
                    const tile = new Tile(gX, gY);
                    this.tiles.push(tile);
                }
                gX++;
            }
            gY++;
            gX = 0;
        }
        if (overlay) {
            this.overlayTiles.cache(0, 0, this.width, this.height);
            this.game.addChild(this.overlayTiles);
            this.game.update();
        }
    }

    /**
     * Returns the tile position on the grid from the pixel position.
     *
     * @param {number} x The horizontal pixel position
     * @param {number} y The vertical pixel position
     * @returns {Tile}
     */
    getTilePositionFromPixelPosition(x, y) {
        return new Tile(x / this.tileSize, y / this.tileSize);
    }

    /**
     * Toggles the grid overlay.
     */
    toggleOverlay() {
        if (this.showGridOverlay) {
            this.showGridOverlay = false;
            this.overlayTiles.removeAllChildren();
            this.overlayTiles.updateCache();
        } else {
            this.showGridOverlay = true;
            this.create(true);
        }
    }

    /**
     * Brings the overlay to the front of the screen. Used for relayering.
     */
    bringOverlayToFront() {
        this.game.setChildIndex(this.overlayTiles, this.game.children.length - 1);
    }

    /**
     * Calls a tick for this grid (based on the EaselJS Ticker).
     */
    tick() {
        if (!this.tickEnabled) return;
        if (this.recreate) {
            this.recreate = false;
            for (let i = 0; i < this.tiles.length; i++) this.game.removeChild(this.tiles[i]);
            this.tiles.length = 0;
            this.create();
        }
    }
}

module.exports = Grid;