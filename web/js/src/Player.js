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
        createjs.Ticker.addEventListener("tick", this.tick.bind(this));

        /**
         * The size of this player in pixels.
         * @type {number}
         */
        this.size = 50;

        /**
         * The speed at which this player will move at.
         * Currently calculated by pixels per frame.
         * TODO: Make a real life value other than pixels per frame.
         */
        this.speed = 10;

        // Create the player for temporary testing \\
        this.graphics.beginFill("blue").drawRect(0, 0, this.size, this.size);
        this.game.addChild(this);
        this.game.update();
    }

    tick() {
        if (this.game.inputHandler.pressedKeys.indexOf("ArrowDown") >= 0) {
            if (this.y < (this.game.spriteHandler.grid.borders.bottom - this.size)) this.y += this.speed;
            if (this.y > (this.game.spriteHandler.grid.borders.bottom - this.size)) this.y = this.game.spriteHandler.grid.borders.bottom - this.size;
        }
        if (this.game.inputHandler.pressedKeys.indexOf("ArrowUp") >= 0) {
            if (this.y > 0) this.y -= this.speed;
            if (this.y < this.game.spriteHandler.grid.borders.top) this.y = this.game.spriteHandler.grid.borders.top;
        }
        if (this.game.inputHandler.pressedKeys.indexOf("ArrowRight") >= 0) {
            if (this.x < (this.game.spriteHandler.grid.borders.right - this.size)) this.x += this.speed;
            if (this.x > (this.game.spriteHandler.grid.borders.right - this.size)) this.x = this.game.spriteHandler.grid.borders.right - this.size;
        }
        if (this.game.inputHandler.pressedKeys.indexOf("ArrowLeft") >= 0) {
            if (this.x > 0) this.x -= this.speed;
            if (this.x < this.game.spriteHandler.grid.borders.left) this.x = this.game.spriteHandler.grid.borders.left;
        }
        /*
        if (this.game.inputHandler.pressedKeys.indexOf("ArrowRight") >= 0) {
            if (this.y < (this.game.spriteHandler.grid.borders.bottom - this.size)) this.y += this.speed;
            if (this.y > (this.game.spriteHandler.grid.borders.bottom - this.size)) this.y = this.game.spriteHandler.grid.borders.bottom - this.size;
        }
        if (this.game.inputHandler.pressedKeys.indexOf("ArrowLeft") >= 0) {
            if (this.y < (this.game.spriteHandler.grid.borders.bottom - this.size)) this.y += this.speed;
            if (this.y > (this.game.spriteHandler.grid.borders.bottom - this.size)) this.y = this.game.spriteHandler.grid.borders.bottom - this.size;
        }
        */
    }
}

module.exports = Player;