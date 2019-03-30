const Grid = require("./Grid/Grid.js");
const Player = require("./Player.js");

/**
 * Manages and handles all sprites on the screen.
 */
class SpriteHandler {
    /**
     * @param {import("./Game.js")} game The game.
     */
    constructor(game) {
        this.game = game;

        /**
         * The grid that will be used to position sprites.
         * @type {Grid}
         */
        this.grid = new Grid(this.game, 50, 20, 15);

        /** TEMPORARY! DO NOT KEEP IN FULL RELEASE! */
        this.grid.toggleOverlay();

        // Initiation \\
        this.init();
    }

    init() {
        this.player = new Player(this.game);
    }
}

module.exports = SpriteHandler;