/**
 * Handles any user input such as keyboard events, mouse events, and more.
 */
class InputHandler {
    /**
     * @param {import("../Game.js")} game The game
     */
    constructor(game) {
        this.game = game;

        /**
         * Contains a list of keys currently pressed down.
         * @type {Array<string>}
         */
        this.pressedKeys = [];

        /**
         * Whether or not to run the tick event.
         * @type {boolean}
         */
        this.tickEnabled = true;

        window.addEventListener("keydown", this.keydown.bind(this));
        window.addEventListener("keyup", this.keyup.bind(this));
        window.addEventListener("keypress", this.keypress.bind(this));
        createjs.Ticker.addEventListener("tick", this.tick.bind(this));
    }

    /**
     * Handles when a key is pressed down on the keyboard.
     * @param {KeyboardEvent} e The event
     */
    keydown(e) {
        if (this.pressedKeys.indexOf(e.key) < 0) this.pressedKeys.push(e.key);
    }

    /**
     * Handles when a key is let up on the keyboard.
     * @param {KeyboardEvent} e The event
     */
    keyup(e) {
        if (this.pressedKeys.indexOf(e.key) >= 0) {
            this.pressedKeys = this.pressedKeys.filter(val => {
                if (val != e.key) return true;
                return false;
            });
        }
    }

    /**
     * Mostly only used for debugging. Is called when a key gets pressed down then back up.
     * @param {KeyboardEvent} e The event
     */
    keypress() {
        // ...
    }

    tick() {
        if (!this.tickEnabled) return;
        if (!document.hasFocus() && this.pressedKeys.length > 0) this.pressedKeys.length = 0;
    }
}

module.exports = InputHandler;