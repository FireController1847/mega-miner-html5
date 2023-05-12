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

        /**
         * An array containing {@link createjs.Text} elements that
         * slowly move upward and disappear after some time.
         * @type {Array<createjs.Text>}
         */
        this.floatingTexts = [];

        createjs.Ticker.addEventListener("tick", this.tick.bind(this));
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

    /**
     * Adds a new floating text which will destroy itself
     * after a set amount of time.
     * @param {string} value The text to add.
     * @param {string} color The color of the text outline.
     * @param {number} x The x position of the text.
     * @param {number} y The y position of the text.
     */
    addFloatingText(value, color, x, y) {
        const text = new createjs.Text(value, "Bold 12px Arial");
        text.textAlign = "center";
        text.x = x;
        text.y = y;

        /* eslint-disable */
        text._drawTextLine = function(ctx, text, y) {
            // var oldTextRendering = ctx.textRendering;
            // ctx.textRendering = "geometricPrecision";
            ctx.fillStyle = "#fff";
            ctx.fillText(text, 0, y, this.maxWidth || 0xFFFF);
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.strokeText(text, 0, y, this.maxWidth || 0xFFFF);
            // ctx.textRendering = oldTextRendering;
        }
        /* eslint-enable */

        this.floatingTexts.push(text);
        this.game.addChild(text);
    }

    tick(event) {
        for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
            const text = this.floatingTexts[i];
            text.y -= 100 * (event.delta / 1000);
            text.alpha -= 0.005;
            if (text.alpha <= 0.05) {
                this.game.removeChild(text);
                this.floatingTexts.splice(i, 1);
            }
        }
    }

    relayer() {
        if (this.map) this.map.bringToFront();
        if (this.player) {
            this.player.bringToFront();
            this.player.drill.bringToFront();
            this.player.boost.bringToFront();
        }
        for (let i = 0; i < this.floatingTexts.length; i++) {
            const text = this.floatingTexts[i];
            this.game.setChildIndex(text, this.game.children.length - 1);
        }
        if (this.grid) this.grid.bringOverlayToFront();
    }
}

module.exports = DisplayHandler;