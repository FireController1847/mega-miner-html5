const Sprite = require("./Graphics/Sprite.js");

class Loader {
    constructor() {
        this.queue = new createjs.LoadQueue();

        this.queue.on("fileload", event => {
            console.log(event);
            event.item.status.loaded = true;
            event.item.image = event.result;
            console.log(`Item with ID of '${event.item.id}' loaded successfully.`);
        }, this);
        this.queue.on("error", e => {
            console.error(e);
        });

        // The list of items can be found below, each classified by its ID.
        this.sprites = [
            new Sprite("nightmare", "web/images/nightmare.png")
        ];
    }

    /**
     * Generic function used for loading everything for the game.
     */
    load(callback) {
        this.queue.on("complete", () => {
            callback();
        });
        this.queue.maintainScriptOrder = true;
        this.queue.loadManifest(this.sprites);
    }
}

module.exports = Loader;