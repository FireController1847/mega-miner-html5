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
         * @type {import("./Map.js")}
         */
        this.map = this.game.displayHandler.map;

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

        // Create the player for temporary testing \\
        this.graphics.beginFill("blue").drawRect(0, 0, this.grid.tileSize, this.grid.tileSize);
        this.game.addChild(this);
        this.game.update();
        createjs.Ticker.addEventListener("tick", this.tick.bind(this));
    }

    tick() {
        if (!this.moving) {
            if (this.game.inputHandler.pressedKeys.indexOf("ArrowDown") >= 0 || this.game.inputHandler.pressedKeys.indexOf("s") >= 0) {
                if (this.pos.y < (this.grid.borders.bottom - this.grid.tileSize)) this.pos.y += this.grid.tileSize;
                if (this.pos.y > (this.grid.borders.bottom - this.grid.tileSize)) this.pos.y = this.grid.borders.bottom - this.grid.tileSize;
            }
            if (this.game.inputHandler.pressedKeys.indexOf("ArrowUp") >= 0 || this.game.inputHandler.pressedKeys.indexOf("w") >= 0) {
                if (this.pos.y > 0) this.pos.y -= this.grid.tileSize;
                if (this.pos.y < this.map.horizonLine - this.grid.tileSize) this.pos.y = this.map.horizonLine - this.grid.tileSize;
            }
            if (this.game.inputHandler.pressedKeys.indexOf("ArrowRight") >= 0 || this.game.inputHandler.pressedKeys.indexOf("d") >= 0) {
                if (this.pos.x < (this.grid.borders.right - this.grid.tileSize)) this.pos.x += this.grid.tileSize;
                if (this.pos.x > (this.grid.borders.right - this.grid.tileSize)) this.pos.x = this.grid.borders.right - this.grid.tileSize;
            }
            if (this.game.inputHandler.pressedKeys.indexOf("ArrowLeft") >= 0 || this.game.inputHandler.pressedKeys.indexOf("a") >= 0) {
                if (this.pos.x > 0) this.pos.x -= this.grid.tileSize;
                if (this.pos.x < this.grid.borders.left) this.x = this.grid.borders.left;
            }
            if (this.pos.y != this.y || this.pos.x != this.x) this.moving = true;
        } else {
            if (this.pos.x != this.x) {
                if (this.x < this.pos.x) this.x += this.speed;
                if (this.x > this.pos.x) this.x -= this.speed;
            } else if (this.pos.y != this.y) {
                if (this.y < this.pos.y) this.y += this.speed;
                if (this.y > this.pos.y) this.y -= this.speed;
            }
            if (this.y == this.pos.y && this.x == this.pos.x) this.moving = false;
        }
    }

    get xCenter() {
        return this.x + (this.grid.tileSize / 2);
    }

    get yCenter() {
        return this.y + (this.grid.tileSize / 2);
    }
}

module.exports = Player;