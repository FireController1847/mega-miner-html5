/**
 * The player's drill animation sprite.
 */
class PlayerDrill extends createjs.Sprite {
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
        this.spriteSheet = this.game.loadingHandler.sprites.player_drills;

        /**
         * Set initial position.
         */
        this.x = player.x;
        this.y = player.y;

        /**
         * Sets the prefix of this drill.
         */
        this.type = PlayerDrill.Type.BASIC;

        /**
         * Set Initial Animation Position
         */
        this.gotoAndPlay(this.type + "_right");

        /**
         * Add drill to game.
         */
        this.game.addChild(this);
        this.game.update();
    }

    /**
     * Updates the position of the drill.
     */
    updatePos() {
        if (this.x != this.player.x || this.y != this.player.y) {
            this.x = this.player.x;
            this.y = this.player.y;
        }
    }

    /**
     * Updates the direction of the drill.
     * @param {string} direction
     */
    updateDirection(direction) {
        this.gotoAndPlay(this.type + "_" + direction);
    }

    /**
     * Updates the type of drill.
     * @param {PlayerDrill.Type}
     */
    updateType(type) {
        this.type = type;
        this.updateDirection(this.player.curDirection);
        this.game.update();
    }

    /**
     * Brings this drill to the front of the screen. Used for relayering.
     */
    bringToFront() {
        this.game.setChildIndex(this, this.game.children.length - 1);
    }
}

/**
 * Determines the type of drill this is.
 * @readonly
 * @enum {string}
 */
PlayerDrill.Type = {
    BASIC: "basic",
    SAPHIRE: "saphire",
    EMERALD: "emerald",
    RUBY: "ruby",
    DIAMOND: "diamond"
};

module.exports = PlayerDrill;