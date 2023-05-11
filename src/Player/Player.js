/** @typedef {import("../Map/MapTile.js")} MapTile */
const Tile = require("../Grid/Tile.js");
const PlayerAnim = require("./PlayerAnim.js");
const PlayerDrill = require("./PlayerDrill.js");
const PlayerBoost = require("./PlayerBoost.js");
const PlayerHold = require("./PlayerHold.js");

/**
 * The player -- the object that the player controls.
 */
class Player extends createjs.Sprite {
    /**
     * @param {import("../Game.js")} game The game.
     */
    constructor(game) {
        super();
        this.game = game;

        /**
         * A reference to the sprite grid for utility purposes.
         * @type {import("../Grid/Grid.js")}
         */
        this.grid = this.game.displayHandler.grid;

        /**
         * A reference to the map for utility purposes.
         * @type {import("../Map/Map.js")}
         */
        this.map = this.game.displayHandler.map;

        /**
         * The speed at which the player will move at by default.
         * @type {number}
         */
        this.defaultSpeed = 5;

        /**
         * The speed at which this player will move at.
         * Currently calculated by pixels per frame.
         * TODO: Make a real life value other than pixels per frame.
         * @type {number}
         */
        this.speed = 5;

        /**
         * How much to muliply the player's speed.
         * Can be used for upgrades. Does not affect non-digging speed.
         * @type {number}
         */
        this.speedMultiplier = 1;

        /**
         * Whether or not to run the tick event.
         * @type {boolean}
         */
        this.tickEnabled = true;

        /**
         * Whether or not the player has the ability to move.
         */
        this.canMove = true;

        /**
         * Whether or not the player is currently moving from one tile to the next.
         * @type {boolean}
         */
        this.moving = false;

        /**
         * Set the initial position for the player.
         */
        this.resetPos();

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
         * The grid position of the next block the player is about to mine.
         * Only updated while mining.
         * @type {Tile}
         */
        this.minetile = null;

        /**
         * How much money the player has.
         * @type {number}
         */
        this.money = 300;

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

        /**
         * How many frames this player can be moving without refuling.
         * @type {number}
         */
        this.maxFuel = 150;

        /**
         * Which upgrade level the fuel tank is at.
         */
        this.tank = 0;

        /**
         * How much fuel the player has left.
         * @type {number}
         */
        this.fuel = this.maxFuel * (this.tank / 2 + 1);

        /**
         * Used to prevent multiple calls when out of fuel.
         * @type {boolean}
         */
        this.fuelDebounce = false;

        /**
         * Used to prevent infinite loops of the positioning system.
         * 0 = right
         * 1 = left
         * 2 = down
         * 3 = up
         * @type {number}
         */
        this.movingDirection = 0;

        /**
         * Initiate sprite sheet.
         * @type {createjs.SpriteSheet}
         */
        this.spriteSheet = this.game.loadingHandler.sprites.player;

        /**
         * The current frame position type we have.
         * @type {string}
         */
        this.curDirection = "right";

        /**
         * Drill! :)
         * @type {import("./PlayerDrill.js")}
         */
        this.drill = new PlayerDrill(game, this);

        /**
         * Boost! :)
         * @type {import("./PlayerBoost.js")}
         */
        this.boost = new PlayerBoost(game, this);

        /**
         * Cargo Hold! :)
         * @type {import("./PlayerHold.js")}
         */
        this.hold = new PlayerHold(game, this);

        /**
         * Animation Handler
         * @type {import("./PlayerAnim.js")}
         */
        this.anim = new PlayerAnim(game, this);

        // Create the player for temporary testing \\
        this.gotoAndStop("right");
        this.game.addChild(this);
        this.game.update();
        createjs.Ticker.addEventListener("tick", this.tick.bind(this));
    }

    tick(event) {
        if (!this.tickEnabled) return;

        let animate = false;
        if (!this.moving && this.canMove) {
            if (this.fuel <= 0) return this.outOfFuel();
            let maptile = this.map.fg_tiles[this.tile.toString()];

            if (this.game.inputHandler.pressedKeys.indexOf("ArrowLeft") >= 0 || this.game.inputHandler.pressedKeys.indexOf("a") >= 0) {
                maptile = this.map.fg_tiles[new Tile(this.tile.gX - 1, this.tile.gY).toString()];
                this.kpCharge(maptile, () => {
                    if (this.pos.x > 0) this.pos.x -= this.grid.tileSize;
                    if (this.pos.x < this.grid.borders.left) this.x = this.grid.borders.left;
                    this.curDirection = "left";
                    this.gotoAndPlay(this.curDirection);
                    this.drill.updateDirection(this.curDirection);
                    this.boost.updateDirection(this.curDirection);
                });
            } else if (this.game.inputHandler.pressedKeys.indexOf("ArrowRight") >= 0 || this.game.inputHandler.pressedKeys.indexOf("d") >= 0) {
                maptile = this.map.fg_tiles[new Tile(this.tile.gX + 1, this.tile.gY).toString()];
                this.kpCharge(maptile, () => {
                    if (this.pos.x < (this.grid.borders.right - this.grid.tileSize)) this.pos.x += this.grid.tileSize;
                    if (this.pos.x > (this.grid.borders.right - this.grid.tileSize)) this.pos.x = this.grid.borders.right - this.grid.tileSize;
                    this.curDirection = "right";
                    this.gotoAndPlay(this.curDirection);
                    this.drill.updateDirection(this.curDirection);
                    this.boost.updateDirection(this.curDirection);
                });
            } else if (this.game.inputHandler.pressedKeys.indexOf("ArrowUp") >= 0 || this.game.inputHandler.pressedKeys.indexOf("w") >= 0) {
                maptile = this.map.fg_tiles[new Tile(this.tile.gX, this.tile.gY - 1).toString()];
                this.kpCharge(maptile, () => {
                    if (this.pos.y > 0) this.pos.y -= this.grid.tileSize;
                    if (this.pos.y < this.map.horizonLine - this.grid.tileSize) this.pos.y = this.map.horizonLine - this.grid.tileSize;
                    this.curDirection = "up";
                    this.gotoAndPlay(this.curDirection);
                    this.drill.updateDirection(this.curDirection);
                    this.boost.updateDirection(this.curDirection);
                });
            } else if (this.game.inputHandler.pressedKeys.indexOf("ArrowDown") >= 0 || this.game.inputHandler.pressedKeys.indexOf("s") >= 0) {
                maptile = this.map.fg_tiles[new Tile(this.tile.gX, this.tile.gY + 1).toString()];
                this.kpCharge(maptile, () => {
                    if (this.pos.y < (this.grid.borders.bottom - this.grid.tileSize)) this.pos.y += this.grid.tileSize;
                    if (this.pos.y > (this.grid.borders.bottom - this.grid.tileSize)) this.pos.y = this.grid.borders.bottom - this.grid.tileSize;
                    this.curDirection = "down";
                    this.gotoAndPlay(this.curDirection);
                    this.drill.updateDirection(this.curDirection);
                    this.boost.updateDirection(this.curDirection);
                });
            } else if (this.charge > 0) {
                this.pos.y = this.y;
                this.pos.x = this.x;
                this.charge = 0;
            }
            animate = true;

            // Determine Speed
            if (maptile) {
                this.speed = ((100 - maptile.properties.thickness) / 100) * (this.defaultSpeed * this.speedMultiplier);
                this.minetile = maptile;
            } else if (this.speed != this.defaultSpeed) {
                this.speed = this.defaultSpeed;
                this.minetile = null;
            }
            if (this.speed > this.defaultSpeed) this.speed = this.defaultSpeed;

            // Determine Position & Direction
            if ((this.pos.y != this.y || this.pos.x != this.x) && (!maptile || this.charge >= this.chargeReq)) {
                this.moving = true;
            }
            if (this.x < this.pos.x) this.movingDirection = 0;
            if (this.x > this.pos.x) this.movingDirection = 1;
            if (this.y < this.pos.y) this.movingDirection = 2;
            if (this.y > this.pos.y) this.movingDirection = 3;
        } else {
            if (this.fuel <= 0) {
                this.moving = false;
                return this.outOfFuel();
            } else if (this.tile.gY > 7) {
                /**
                 * To calculate the fuel loss, the original game
                 * used the arbitrary values of "0.1" when mining
                 * a tile and "0.07" for movement underground
                 * without mining. These values, I assume, are
                 * tied to the framerate (or tickrate) of the
                 * original game.
                 *
                 * The "0.1" allows the player to mine approximately
                 * 60 tiles in the base game at initial fuel levels.
                 * To get closest to these arbitrary values, I used
                 * values "0.062" for mining a tile and, using the
                 * ratio of 0.062 / 0.1 * 0.07, "0.0434" for moving without
                 * a tile.
                 */
                if (this.minetile) {
                    this.updateFuel((event.delta / 16.666) * -0.062);
                } else {
                    this.updateFuel((event.delta / 16.666) * -0.0434);
                }
            }

            if (this.pos.x != this.x) {
                if (this.movingDirection == 0) this.x += (event.delta / 16.666) * this.speed;
                if (this.movingDirection == 1) this.x -= (event.delta / 16.666) * this.speed;
            } else if (this.pos.y != this.y) {
                if (this.movingDirection == 2) this.y += (event.delta / 16.666) * this.speed;
                if (this.movingDirection == 3) this.y -= (event.delta / 16.666) * this.speed;
            }

            if (
                // Check Left
                (this.movingDirection == 0 && this.x >= this.pos.x) ||
                (this.movingDirection == 1 && this.x <= this.pos.x) ||
                (this.movingDirection == 2 && this.y >= this.pos.y) ||
                (this.movingDirection == 3 && this.y <= this.pos.y)
            ) {
                this.y = this.pos.y;
                this.x = this.pos.x;
                this.tile = this.grid.getTilePositionFromPixelPosition(this.x, this.y);
                const maptile = this.map.fg_tiles[this.tile.toString()];
                if (maptile) {
                    this.map.tiles.removeChild(maptile);
                    delete this.map.fg_tiles[this.tile.toString()];
                    this.hold.addMapTile(maptile);
                    this.dispatchEvent(new CustomEvent("tiledestroy", { detail: this.tile }));
                    this.minetile = null;
                }
                this.moving = false;
                this.dispatchEvent(new CustomEvent("tilemove", { detail: this.tile }));
            }
        }

        if (!animate) {
            animate = this.moving;
        }
        if (this.moving && !this.paused) {
            this.anim.onAnimate(this.minetile);
        }
        this.drill.updatePos();
        this.boost.updatePos();
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
     * Updates the amount of fuel the player has.
     */
    updateFuel(amount) {
        this.fuel += amount;
        document.getElementById("fuel").innerHTML = `Fuel Left: ${Math.max(Math.ceil((this.fuel / this.maxFuel) * 10000) / 100, 0)}%`;
    }

    /**
     * Event for when the player has run out of fuel.
     */
    outOfFuel() {
        if (this.fuelDebounce) return;
        this.fuelDebounce = true;
        this.canMove = false;
        console.warn("PLAYER OUT OF FUEL, RECHARGING!");
        this.game.displayHandler.fade(true, () => {
            const depth = this.tile.gY - 3;
            const depthInMeters = depth * Math.round(depth / this.grid.metersPerTile);
            this.fuel = this.maxFuel;
            this.updateFuel(0);
            this.money -= depthInMeters + this.maxFuel;
            this.resetPos();
            setTimeout(() => {
                this.game.displayHandler.fade(false, () => {
                    console.log("FUEL RECHARGE COMPLETE");
                    this.fuelDebounce = false;
                    this.canMove = true;
                });
            }, 2000);
        });
    }

    /**
     * Resets the player to the initial position.
     */
    resetPos() {
        this.x = Math.round((this.grid.widthGU * this.grid.tileSize) / 2);
        this.y = this.map.horizonLine - this.grid.tileSize;
        this.pos = { x: this.x, y: this.y };
    }

    /**
     * Gets the MapTile that is below the player by 1 GU.
     * @returns {MapTile}
     */
    getTileBelow() {
        this.map.fg_tiles.get();
    }

    /**
     * Brings this player to the front of the screen. Used for relayering.
     */
    bringToFront() {
        this.game.setChildIndex(this, this.game.children.length - 1);
    }

    get xCenter() {
        return this.x + (this.grid.tileSize / 2);
    }

    get yCenter() {
        return this.y + (this.grid.tileSize / 2);
    }
}

/**
 * Determines the different frame positions.
 * Used for fetching the image from the loader.
 * @readonly
 * @enum {number}
 */
Player.FramePositionType = {
    DOWN: 0,
    UP: 4,
    RIGHT: 8,
    LEFT: 12
};

module.exports = Player;