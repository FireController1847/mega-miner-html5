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

        // Add the appropriate type to the hold
        switch (maptile.properties.type) {
            case MapTile.Type.COAL:
                this.mapTiles.push(maptile.properties);
                this.updateHold();
                break;
            default:
                return true;
        }

        // Put text upon collection
        this.game.displayHandler.addFloatingText("+1 " + maptile.properties.name.toUpperCase(), maptile.properties.color, maptile.x + this.game.displayHandler.map.grid.tileSize / 2, maptile.y);

        return true;
    }

    updateHold() {
        document.getElementById("hold").innerHTML = `Hold: ${this.mapTiles.length} items`;
    }
}

module.exports = PlayerHold;