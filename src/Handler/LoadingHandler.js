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
         * The path to the manifest.
         * @type {string}
         */
        this.manifest = "assets/manifest.json";

        /**
         * Contains a list of all the sprites used in the game indexed by their asset id.
         * @type {Object.<string, HTMLImageElement|createjs.SpriteSheet>}
         */
        this.sprites = {

        };
    }

    load(callback) {
        this.loader = new createjs.LoadQueue();

        this.loader.on("fileload", event => {
            if (event.item.type == "image" || event.item.type == "spritesheet") {
                this.sprites[event.item.id] = event.result;
            }
        });
        this.loader.on("error", err => {
            console.warn("Failed to load " + err.data.id + "!");
        });
        this.loader.on("complete", callback);

        this.loader.loadManifest({ src: this.manifest, type: "manifest" });
    }
}

module.exports = LoadingHandler;