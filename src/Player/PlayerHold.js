/** @typedef {import("../MapTile.js").MapTileProperties} MapTileProperties */
const MapTile = require("../Map/MapTile.js");

/**
 * The player's cargo hold; a simple class holding all of the tiles the player has drilled.
 */
class PlayerHold {
    constructor(game, player) {
        this.game = game;
        this.player = player;

        /**
         * The maptiles collected.
         * @type {Array<MapTileProperties>}
         */
        this.mapTiles = [];

        /**
         * The hold capacity.
         * @type {number}
         */
        this.capacity = 10;
    }

    /**
     * Inserts a maptile into the hold if it's an ore.
     *
     * @param {MapTile} maptile The maptile to add.
     * @return {boolean} True if added or is non-ore, false if hold is full.
     */
    addMapTile(maptile) {
        if (this.mapTiles.length >= this.capacity) {
            return false;
        }
        switch (maptile.properties.type) {
            case MapTile.Type.COAL:
                this.mapTiles.push(maptile.properties);
                this.updateHold();
        }
        return true;
    }

    updateHold() {
        document.getElementById("hold").innerHTML = `Hold Count: ${this.mapTiles.length}`;
    }
}

module.exports = PlayerHold;