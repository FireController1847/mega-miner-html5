const { ShapeUtil, Borders } = require("./ShapeUtil.js");

/**
 * Controls the position of the stage, is built to follow the player.
 * TODO: When the UI is implemented, do NOT follow player. Player will not exist.
 */
class Camera {
    /**
     * @param {import("./Game.js")} game The game.
     */
    constructor(game) {
        this.game = game;

        /**
         * A reference to the player for utility purposes.
         * @type {import("./Player/Player.js")}
         */
        this.player = this.game.displayHandler.player;

        /**
         * A reference to the sprite grid for utility purposes.
         * @type {import("./Grid/Grid.js")}
         */
        this.grid = this.game.displayHandler.grid;

        /**
         * The borders of the viewport for this camera.
         * @type {Borders}
         */
        this.viewport = new Borders(
            this.game.x,
            this.game.y,
            this.game.canvas.width,
            this.game.canvas.height
        );

        /**
         * Whether or not to run the tick event.
         * @type {boolean}
         */
        this.tickEnabled = true;

        createjs.Ticker.addEventListener("tick", this.tick.bind(this));
    }

    tick() {
        if (!this.tickEnabled) return;
        if (!this.player) return;
        if (!this.grid) return;

        // Update Viewport
        if (this.viewport.right != (this.game.canvas.width / this.game.scaleX)) this.viewport.right = this.game.canvas.width / this.game.scaleX;
        if (this.viewport.bottom != (this.game.canvas.height / this.game.scaleY)) this.viewport.bottom = this.game.canvas.height / this.game.scaleY;

        // Handle Horizontal
        if (this.player.xCenter - this.viewport.left + this.leftDeadZone > this.viewport.right) {
            this.viewport.left = (this.player.xCenter - (this.viewport.right - this.leftDeadZone)) * this.game.scaleX;
        } else if (this.player.xCenter - this.leftDeadZone < this.viewport.left) {
            this.viewport.left = (this.player.xCenter - this.leftDeadZone) * this.game.scaleX;
        }

        // Handle Vertical
        if (this.player.yCenter - this.viewport.top + this.topDeadZone > this.viewport.bottom) {
            this.viewport.top = (this.player.yCenter - (this.viewport.bottom - this.topDeadZone)) * this.game.scaleY;
        } else if (this.player.yCenter - this.topDeadZone < this.viewport.top) {
            this.viewport.top = (this.player.yCenter - this.topDeadZone) * this.game.scaleY;
        }

        // Stop at SpriteGrid Boundaries (basically the map)
        if (!ShapeUtil.within(this.viewport, this.grid.borders)) {
            if (this.viewport.top < this.grid.borders.top) {
                this.viewport.top = this.grid.borders.top;
            }
            if (this.viewport.left < this.grid.borders.left) {
                this.viewport.left = this.grid.borders.left;
            }
            if ((this.viewport.bottom + (this.viewport.top / this.game.scaleY)) > this.grid.borders.bottom) {
                this.viewport.top = (this.grid.borders.bottom - this.viewport.bottom) * this.game.scaleY;
            }
            if ((this.viewport.right + (this.viewport.left / this.game.scaleY)) > this.grid.borders.right) {
                this.viewport.left = (this.grid.borders.right - this.viewport.right) * this.game.scaleX;
            }
        }

        if (this.game.y != -this.viewport.top) this.game.y = -this.viewport.top;
        if (this.game.x != -this.viewport.left) this.game.x = -this.viewport.left;
    }

    /**
     * The distance from the left border of the screen before the camera moves.
     * @type {number}
     */
    get leftDeadZone() {
        return (this.game.canvas.width / this.game.scaleX) / 2;
    }

    /**
     * The distance from the top border of the screen before the camera moves.
     * @type {number}
     */
    get topDeadZone() {
        return (this.game.canvas.height / this.game.scaleY) / 2;
    }
}

module.exports = Camera;