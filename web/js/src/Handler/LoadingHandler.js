const Sprite = require("../Sprite.js");

/**
 * Used for handling everything that needs to be loaded.
 * Also contains direct pathes to many needed objects like sprites.
 */
class LoadingHandler {
    /**
     * @param {import("../Game.js")} game The game.
     */
    constructor(game) {
        this.game = game;

        /**
         * Contains a list of all the sprites used in the game.
         * TODO: Create a JSON manifest for this instead.
         * @type {Object.<string, Sprite>}
         */
        this.sprites = {
            grass: new Sprite("web/images/grass.png"),
            dirt: new Sprite("web/images/dirt.png")
        };
    }

    /**
     * Grabs each sprite from the sprite list and loads it, then calls the callback once completed.
     */
    loadSprites(callback) {
        this.spriteQueue = new createjs.LoadQueue();
        for (const key in this.sprites) {
            this.spriteQueue.loadFile(this.sprites[key], false);
        }

        this.spriteQueue.on("fileload", target => {
            target.item.loaded = true;
            target.item.image = target.result;
        });
        this.spriteQueue.on("error", target => {
            target.data.errored = true;
        });
        this.spriteQueue.on("complete", callback);

        this.spriteQueue.load();
    }
}

module.exports = LoadingHandler;