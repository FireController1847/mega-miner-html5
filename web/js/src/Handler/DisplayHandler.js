const Grid = require("../Grid/Grid.js");
const Player = require("../Player.js");
const Camera = require("../Camera.js");
const GameMap = require("../Map/Map.js");

/**
 * Manages and handles all sprites on the screen.
 */
class DisplayHandler {
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
        this.map = new GameMap(this.game);
        this.map.generate();

        this.player = new Player(this.game);
        this.camera = new Camera(this.game);
        this.relayer();
    }

    relayer() {
        this.grid.bringOverlayToFront();
    }
}

module.exports = DisplayHandler;