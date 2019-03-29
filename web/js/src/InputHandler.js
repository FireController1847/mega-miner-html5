class InputHandler {
    constructor(game) {
        this.game = game;

        /**
         * Contains a list of keys currently pressed down.
         * @type {Array<string>}
         */
        this.pressedKeys = [];

        window.addEventListener("keydown", this.keydown.bind(this));
        window.addEventListener("keyup", this.keyup.bind(this));
        window.addEventListener("keypress", this.keypress.bind(this));
    }

    /**
     * Handles when a key is pressed down on the keyboard.
     * @param {KeyboardEvent} e The event
     */
    keydown(e) {
        if (this.pressedKeys.indexOf(e.key) < 0) this.pressedKeys.push(e.key);
        console.log(this.pressedKeys);
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
        console.log(this.pressedKeys);
    }

    /**
     * Mostly only used for debugging. Is called when a key gets pressed down then back up.
     * @param {KeyboardEvent} e The event
     */
    keypress() {
        // ...
    }
}

module.exports = InputHandler;