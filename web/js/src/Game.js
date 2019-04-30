// Shim is required for IE & Edge support.
const shim = require("shim-keyboard-event-key"); // eslint-disable-line
// Requirements
const InputHandler = require("./Handler/InputHandler.js");
const DisplayHandler = require("./Handler/DisplayHandler.js");
const LoadingHandler = require("./Handler/LoadingHandler.js");

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
        this.snapToPixelEnabled = true;
        this.inputHandler = new InputHandler(this);
        this.displayHandler = new DisplayHandler(this);
        // TEMPORARY SPRITE TEST
        this.loadingHandler = new LoadingHandler(this);
        this.loadingHandler.load(this.displayHandler.init.bind(this.displayHandler));
        // END TEMPORARY SPRITE TEST
        createjs.Ticker.addEventListener("tick", this);
        createjs.Ticker.framerate = this.framerate;
        // Checks HTML every second to determine if modified.
        // Used to prevent deletion of the fow or canvas, as well as the fading.
        this.checkHTML();
        this.resize();
        this.canvas.getContext("2d").imageSmoothingEnabled = false;
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

    /**
     * Checks the HTML every second to determine if it's been modified.
     * Used to prevent delition of the fow or canvas by casual methods.
     */
    checkHTML() {
        let modified = false;
        setInterval(() => {
            if (modified) return;
            if (
                !document.getElementById("canvas") ||
                !document.getElementById("fow") ||
                !document.getElementById("fade")
            ) {
                modified = true;
                document.write("Whoops! You've modified the HTML. Since this game is built using different parts of the DOM, there's some hidden things you can't see! So, the game has reset. Maybe try not doing that again?");
                setTimeout(() => {
                    location.reload();
                }, 10000);
            }
        }, 1000);
    }
}

window.onload = function() {
    // Create and initiate the game. Wohoo!
    window.game = new Game();
};

// Used for typedef. No real use in code.
module.exports = Game;