// Shim is required for IE11- support.
const shim = require("shim-keyboard-event-key"); // eslint-disable-line
// Requirements
const StageBackground = require("./Stages/BackgroundStage.js");
const InputHandler = require("./InputHandler.js");

class Game {
    constructor() {
        // Variables \\
        /**
         * The canvas.
         * @type {HTMLCanvasElement}
         */
        this.canvas = document.getElementById("canvas");

        /**
         * The stages used to build the game.
         * Treated like "layers", which each stage on top of one another.
         * @type {Object.<string, createjs.Stage>}
         */
        this.stages = {};

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
     * Initiates variables, arrays, and stages.
     */
    init() {
        this.inputHandler = new InputHandler(this);
        this.stages.background = new StageBackground(this);
        for (const key in this.stages) {
            createjs.Ticker.addEventListener("tick", this.stages[key]);
        }
        createjs.Ticker.framerate = this.framerate;
        this.resize();
    }

    /**
     * Resizes the canvas to the window.
     * Asks for an update of all stages.
     */
    resize(height = window.innerHeight, width = window.innerWidth) {
        this.canvas.height = height;
        this.canvas.width = width;
        this.update();
    }

    /**
     * Loops though all stages and calls for an update.
     */
    update(...args) {
        for (const key in this.stages) {
            this.stages[key].update(...args);
        }
    }
}

new Game();