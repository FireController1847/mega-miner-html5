const Sprite = require("./Sprite.js");

/**
 * Handles and creates all tiles relating to the map itself.
 * Also handles map generation.
 */
class Map {
    /**
     * @param {import("./Game.js")} game The game.
     */
    constructor(game) {
        this.game = game;

        /**
         * A reference to the sprite grid for utility purposes.
         * @type {import("./Grid/Grid.js")}
         */
        this.grid = this.game.spriteHandler.grid;

        /**
         * Determines the maximum position vertically that tiles will be generated.
         */
        this.horizonLine = 8 * this.grid.tileSize;
    }

    generate() {
        /** TEST SPRITE */
        this.sprite = new Sprite(this);
        this.sprite.drawImageRect(this.game.img, 0, this.horizonLine, this.grid.borders.right, this.grid.borders.bottom);
        this.game.addChild(this.sprite);
        this.game.update();
    }
}

module.exports = Map;