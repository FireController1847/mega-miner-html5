const Grid = require("../Grid/Grid.js");
const Player = require("../Player.js");
const Camera = require("../Camera.js");

/**
 * Manages and handles all sprites on the screen.
 */
class SpriteHandler {
    /**
     * @param {import("../Game.js")} game The game.
     */
    constructor(game) {
        this.game = game;

        /**
         * The grid that will be used to position sprites.
         * @type {Grid}
         */
        this.grid = new Grid(this.game, 50, 40, 40);

        /** TEMPORARY! DO NOT KEEP IN FULL RELEASE! */
        this.grid.toggleOverlay();
    }

    init() {
        this.player = new Player(this.game);
        this.camera = new Camera(this.game);
    }
}

module.exports = SpriteHandler;