/** @typedef {import("./Map/MapTile.js")} MapTile */
const Tile = require("./Grid/Tile.js");

/**
 * The player -- the object that the player controls.
 */
class Player extends createjs.Shape {
    /**
     * @param {import("./Game.js")} game The game.
     * @param  {...any} args The arguments for this EaselJS Shape
     */
    constructor(game, ...args) {
        super(...args);
        this.game = game;

        /**
         * A reference to the sprite grid for utility purposes.
         * @type {import("./Grid/Grid.js")}
         */
        this.grid = this.game.displayHandler.grid;

        /**
         * A reference to the map for utility purposes.
         * @type {import("./Map/Map.js")}
         */
        this.map = this.game.displayHandler.map;

        /**
         * The speed at which the player will move at by default.
         * @type {number}
         */
        this.defaultSpeed = 6.25;

        /**
         * The speed at which this player will move at.
         * Currently calculated by pixels per frame.
         * TODO: Make a real life value other than pixels per frame.
         * @type {number}
         */
        this.speed = 5;

        /**
         * Whether or not to run the tick event.
         * @type {boolean}
         */
        this.tickEnabled = true;

        /**
         * Whether or not the character is currently moving from one tile to the next.
         * @type {boolean}
         */
        this.moving = false;

        /**
         * Set the initial position for the player.
         */
        this.x = Math.round((this.grid.width * this.grid.tileSize) / 2);
        this.y = this.map.horizonLine - this.grid.tileSize;

        /**
         * The pixel position of the player before actual movement.
         * Determines where the player is about to actually move to.
         * @type {Object.<number, number>}
         */
        this.pos = { x: this.x, y: this.y };

        /**
         * The grid position of the player after actual movement.
         * @type {Tile}
         */
        this.tile = this.grid.getTilePositionFromPixelPosition(this.x, this.y);

        /**
         * The amount of ticks required before the player can enter a maptile.
         * Creates a sort of "push force" feeling.
         * @type {number}
         */
        this.chargeReq = 10;

        /**
         * How many more ticks we're waiting for before it mines.
         * @type {number}
         */
        this.charge = 0;

        // Create the player for temporary testing \\
        this.graphics.beginFill("blue").drawRect(0, 0, this.grid.tileSize, this.grid.tileSize);
        this.game.addChild(this);
        this.game.update();
        createjs.Ticker.addEventListener("tick", this.tick.bind(this));
    }

    tick() {
        if (!this.moving) {
            let maptile = this.map.tiles[this.tile.toString()];
            if (!maptile && this.speed != this.defaultSpeed) this.speed = this.defaultSpeed;

            if (this.game.inputHandler.pressedKeys.indexOf("ArrowLeft") >= 0 || this.game.inputHandler.pressedKeys.indexOf("a") >= 0) {
                maptile = this.map.tiles[new Tile(this.tile.gX - 1, this.tile.gY).toString()];
                this.kpCharge(maptile, () => {
                    if (this.pos.x > 0) this.pos.x -= this.grid.tileSize;
                    if (this.pos.x < this.grid.borders.left) this.x = this.grid.borders.left;
                });
            } else if (this.game.inputHandler.pressedKeys.indexOf("ArrowRight") >= 0 || this.game.inputHandler.pressedKeys.indexOf("d") >= 0) {
                maptile = this.map.tiles[new Tile(this.tile.gX + 1, this.tile.gY).toString()];
                this.kpCharge(maptile, () => {
                    if (this.pos.x < (this.grid.borders.right - this.grid.tileSize)) this.pos.x += this.grid.tileSize;
                    if (this.pos.x > (this.grid.borders.right - this.grid.tileSize)) this.pos.x = this.grid.borders.right - this.grid.tileSize;
                });
            } else if (this.game.inputHandler.pressedKeys.indexOf("ArrowUp") >= 0 || this.game.inputHandler.pressedKeys.indexOf("w") >= 0) {
                maptile = this.map.tiles[new Tile(this.tile.gX, this.tile.gY - 1).toString()];
                this.kpCharge(maptile, () => {
                    if (this.pos.y > 0) this.pos.y -= this.grid.tileSize;
                    if (this.pos.y < this.map.horizonLine - this.grid.tileSize) this.pos.y = this.map.horizonLine - this.grid.tileSize;
                });
            } else if (this.game.inputHandler.pressedKeys.indexOf("ArrowDown") >= 0 || this.game.inputHandler.pressedKeys.indexOf("s") >= 0) {
                maptile = this.map.tiles[new Tile(this.tile.gX, this.tile.gY + 1).toString()];
                this.kpCharge(maptile, () => {
                    if (this.pos.y < (this.grid.borders.bottom - this.grid.tileSize)) this.pos.y += this.grid.tileSize;
                    if (this.pos.y > (this.grid.borders.bottom - this.grid.tileSize)) this.pos.y = this.grid.borders.bottom - this.grid.tileSize;
                });
            } else if (this.charge > 0) {
                this.pos.y = this.y;
                this.pos.x = this.x;
                this.charge = 0;
            }
            if (maptile) this.speed = maptile.properties.thickness;
            if ((this.pos.y != this.y || this.pos.x != this.x) && (!maptile || this.charge >= this.chargeReq)) this.moving = true;
        } else {
            if (this.pos.x != this.x) {
                if (this.x < this.pos.x) this.x += this.speed;
                if (this.x > this.pos.x) this.x -= this.speed;
            } else if (this.pos.y != this.y) {
                if (this.y < this.pos.y) this.y += this.speed;
                if (this.y > this.pos.y) this.y -= this.speed;
            }
            if (this.y == this.pos.y && this.x == this.pos.x) {
                this.tile = this.grid.getTilePositionFromPixelPosition(this.x, this.y);
                const maptile = this.map.tiles[this.tile.toString()];
                if (maptile) {
                    this.game.removeChild(maptile);
                    delete this.map.tiles[this.tile.toString()];
                }
                this.moving = false;
            }
        }
    }

    /**
     * Handles "charging" the player up to mine a tile on every keypress.
     *
     * @param {MapTile} maptile The maptile.
     * @param {CallableFunction} logic The logic for this keypress.
     */
    kpCharge(maptile, logic) {
        if (!maptile || this.charge <= 0 || this.charge > this.chargeReq) {
            logic();
        }
        if (this.charge <= this.chargeReq) this.charge++;
    }

    /**
     * Gets the MapTile that is below the player by 1 GU.
     * @returns {MapTile}
     */
    getTileBelow() {
        this.map.tiles.get();
    }

    get xCenter() {
        return this.x + (this.grid.tileSize / 2);
    }

    get yCenter() {
        return this.y + (this.grid.tileSize / 2);
    }
}

module.exports = Player;