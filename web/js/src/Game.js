// Shim is required for IE & Edge support.
const shim = require("shim-keyboard-event-key"); // eslint-disable-line
// Requirements
const InputHandler = require("./Handler/InputHandler.js");
const SpriteHandler = require("./Handler/SpriteHandler.js");

class Game extends createjs.Stage {
    constructor() {
        super(document.getElementById("canvas"));

        // Variables \\
        /**
         * Handles keyboard and mouse events.
         * @type {InputHandler}
         */
        this.inputHandler = null;


        // Options \\
        /**
         * Determines how quickly the EaselJS Ticker runs.
         * @type {number}
         */
        this.framerate = 60;


        // Events \\
        window.addEventListener("resize", () => { this.resize(); });


        // Initiation \\
        this.init();
    }

    /**
     * Initiates variables, arrays, and other objects.
     */
    init() {
        this.inputHandler = new InputHandler(this);
        this.spriteHandler = new SpriteHandler(this);
        createjs.Ticker.addEventListener("tick", this);
        createjs.Ticker.framerate = this.framerate;
        this.resize();
    }

    /**
     * Resizes the canvas to the window.
     * Updates the stage.
     */
    resize(height = window.innerHeight, width = window.innerWidth) {
        this.canvas.height = height;
        this.canvas.width = width;
        this.update();
    }
}

// Create and initiate the game. Wohoo!
window.game = new Game();

// Used for typedef. No real use in code.
module.exports = Game;