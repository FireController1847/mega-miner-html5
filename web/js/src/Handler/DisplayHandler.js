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
         * WARNING: True grid size is ~100x250, update before release!
         * INFO: Grid kept small to keep load times short during development.
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

    fade(out, callback) {
        if (out == null || !callback) throw new Error("Missing arguments");
        const fade = document.getElementById("fade");
        if (out) fade.style.opacity = 0;
        else fade.style.opacity = 1;
        // Set opacity then wait for transition
        if (out) fade.style.opacity = 1;
        else fade.style.opacity = 0;
        setTimeout(() => callback(), 1000);
    }

    relayer() {
        this.grid.bringOverlayToFront();
    }
}

module.exports = DisplayHandler;