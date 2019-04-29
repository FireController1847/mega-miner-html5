/**
 * Basically a utility class for images to determine if they're loaded or not.
 */
class Sprite extends createjs.LoadItem {
    /**
     * @param {string} loc The location of the file for this sprite.
     */
    constructor(loc) {
        super();

        /**
         * Whether or not this sprite is loaded.
         * @type {boolean}
         */
        this.loaded = false;

        /**
         * Whether or not this sprite errored while loading.
         * @type {boolean}
         */
        this.errored = false;

        /**
         * The location of the file for this sprite.
         * @type {string}
         */
        this.src = loc;

        /**
         * The HTML image of this sprite if it loaded.
         * @type {HTMLImageElement}
         */
        this.image = null;
    }
}

module.exports = Sprite;