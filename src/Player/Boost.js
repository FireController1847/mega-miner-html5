/**
 * The player's boost animation sprite.
 */
class PlayerBoost extends createjs.Sprite {
    /**
     * @param {import("../../Game.js")} game
     * @param {import("./Player.js")} player
     */
    constructor(game, player) {
        super();
        this.game = game;
        this.player = player;

        /**
         * Initiate sprite sheet.
         * @type {createjs.SpriteSheet}
         */
        this.spriteSheet = this.game.loadingHandler.sprites.player_boost;

        /**
         * Store direction given from {@link PlayerBoost#updateDirection()}
         * @type {string}
         */
        this.direction = "right";

        /**
         * Set initial position.
         */
        this.x = player.x;
        this.y = player.y;

        /**
         * Set initial animation position.
         */
        this.gotoAndPlay("right");

        /**
         * Add playerboost to game.
         */
        this.game.addChild(this);
        this.game.update();
    }

    /**
     * Updates the position of the boost.
     */
    updatePos() {
        if (this.visible != this.player.moving) {
            this.visible = this.player.moving;
        }

        let boostX;
        let boostY;
        if (this.direction == "right") {
            boostX = this.player.x - 18;
            boostY = this.player.y + 25;
        } else if (this.direction == "left") {
            boostX = this.player.x + 51;
            boostY = this.player.y + 25;
        } else if (this.direction == "down") {
            boostX = this.player.x + 14;
            boostY = this.player.y - 20;
        } else if (this.direction == "up") {
            boostX = this.player.x + 14;
            boostY = this.player.y + 53;
        }
        if (this.x != boostX || this.y != boostY) {
            this.x = boostX;
            this.y = boostY;
        }
    }

    /**
     * Updates the direction of the drill.
     * @param {string} direction
     */
    updateDirection(direction) {
        this.direction = direction;
        this.gotoAndPlay(direction);
    }

    /**
     * Brings this drill to the front of the screen. Used for relayering.
     */
    bringToFront() {
        this.game.setChildIndex(this, this.game.children.length - 1);
    }
}

module.exports = PlayerBoost;