const MapTile = require("../Map/MapTile.js");

/**
 * The player animation controller.
 */
class PlayerAnim {
    /**
     * @param {import("../Game.js")} game
     * @param {import("./Player.js")} player
     */
    constructor(game, player) {
        this.game = game;

        /**
         * A reference to the player.
         * @type {import("./Player.js")}
         */
        this.player = player;

        /**
         * Player Animation Delay
         * @type {number}
         */
        this.playerAnimDelay = 4;

        /**
         * A reference to the drill on the player.
         * @type {import("./Drill.js")}
         */
        this.drill = player.drill;

        /**
         * Drill Animation Delay
         * @type {number}
         */
        this.drillAnimDelay = 5;

        /**
         * A reference to the boost on the player.
         * @type {import("./Boost.js")}
         */
        this.boost = player.boost;

        /**
         * Boost Animation Delay
         * @type {number}
         */
        this.boostAnimDelay = 1;

        /**
         * Delays storage values.
         */
        this.playerAnimDelayCur = 0;
        this.drillAnimDelayCur = 0;
        this.boostAnimDelayCur = 0;
    }

    /**
     * Called when the player would like us to animate.
     * @param {import("../Map/MapTile.js")} maptile Maptile, if any.
     */
    onAnimate(maptile) {
        // Player Animation
        if (this.playerAnimDelayCur > this.playerAnimDelay) {
            this.playerAnimDelayCur = 0;
            this.player.advance();
        }
        this.playerAnimDelayCur++;

        // Drill Animation
        if (maptile && maptile.properties && maptile.properties.type != MapTile.Type.BG_GRASS && this.drillAnimDelayCur > this.drillAnimDelay) {
            this.drillAnimDelayCur = 0;
            this.drill.advance();
        }
        this.drillAnimDelayCur++;

        // Boost Animation
        if (this.boostAnimDelayCur > this.boostAnimDelay) {
            this.boostAnimDelayCur = 0;
            this.boost.advance();
        }
        this.boostAnimDelayCur++;
    }
}

module.exports = PlayerAnim;