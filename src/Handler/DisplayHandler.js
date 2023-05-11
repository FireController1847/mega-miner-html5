const Grid = require("../Grid/Grid.js");
const Player = require("../Player/Player.js");
const Camera = require("../Camera.js");
const GameMap = require("../Map/Map.js");
const FOWHandler = require("./FOWHandler.js");

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
    }

    init() {
        // Generate Map
        this.map = new GameMap(this.game);
        this.map.generate();

        // Initiate Player & Camera
        this.player = new Player(this.game);
        this.camera = new Camera(this.game);
        this.relayer();

        // Initiate Fog-Of-War
        this.fow = new FOWHandler(this.game);
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
        if (this.map) this.map.bringToFront();
        if (this.player) {
            this.player.bringToFront();
            this.player.drill.bringToFront();
            this.player.boost.bringToFront();
        }
        if (this.grid) this.grid.bringOverlayToFront();
    }
}

module.exports = DisplayHandler;