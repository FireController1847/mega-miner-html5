// Requirements
const InputHandler = require("./Handler/InputHandler.js");
const DisplayHandler = require("./Handler/DisplayHandler.js");
const LoadingHandler = require("./Handler/LoadingHandler.js");
// BRFS
const fs = require("fs");
// Polyfills
require("./Polyfill.js")();

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
        this.framerate = Infinity;

        /**
         * The last average framerate.
         * @type {number}
         */
        this.lastAvgFramerate = 0;

        /**
         * A temporary holder for frame counts.
         * @type {number}
         */
        this.frameCount = 0;

        /**
         * The amount of time between frames stored for one second, then averaged to get the FPS.
         */
        this.timeBetweenFramesCount = 0;

        /**
         * The amount of time since the last framerate update.
         * @type {number}
         */
        this.timeSinceLastFpsCheck = Date.now();

        /**
         * The amount of time since the last frame.
         * @type {number}
         */
        this.timeSinceLastFrame = Date.now();

        /**
         * Whether or not to enable framerate monitor.
         * @type {boolean}
         */
        this.monitorFramerate = true;

        /**
         * The HTML element for the FPS counter.
         * @type {HTMLElement}
         */
        this.fpsElement = null;


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
     * Runs every time the createjs ticker ticks.
     */
    tick() {
        if (this.fpsElement == null) return;
        if (this.monitorFramerate) {
            // const time = Date.now() - this.timeSinceLastFrame;
            // if (time > 18) {
            //     console.log("SPIKE @ " + (1000 / (Date.now() - this.timeSinceLastFrame)));
            // }
            this.timeBetweenFramesCount += Date.now() - this.timeSinceLastFrame;
            this.timeSinceLastFrame = Date.now();

            if (this.fpsElement.style.display == "none") {
                this.fpsElement.style.display = "block";
            }
            this.frameCount++;
            if (Date.now() - this.timeSinceLastFpsCheck >= 1000) {
                this.lastAvgFramerate = this.frameCount;
                this.timeSinceLastFpsCheck = Date.now();
                this.fpsElement.innerHTML = "FPS: " + Math.round(1000 / (this.timeBetweenFramesCount / this.frameCount));
                this.timeBetweenFramesCount = 0;
                this.frameCount = 0;
            }
        } else if (this.fpsElement.style.display == "block") {
            this.fpsElement.style.display = "none";
        }
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
     * Linter interpolation
     * @param {number} start
     * @param {number} end
     * @param {number} amount
     */
    lerp(start, end, amount) {
        return (1 - amount) * start + amount * end;
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
    const pkg = require("../package.json");
    const rev = fs.readFileSync(".git/refs/heads/master").toString().substring(0, 7).trim();
    document.getElementById("version").innerHTML = `Version ${pkg.version}.${rev}`;
    // Create and initiate the game. Wohoo!
    window.game = new Game();
    window.game.fpsElement = document.getElementById("fps");
};

// Used for typedef. No real use in code.
module.exports = Game;