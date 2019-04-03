/** @typedef {import("../MapTile.js").MapTileProperties} MapTileProperties */
const MapTile = require("../MapTile.js");

class Grass extends MapTile {
    constructor(...args) {
        super(...args);

        /** @type {string} */
        this.appearance = "dirt";

        /** @type {MapTileProperties} */
        this.properties = {
            type: MapTile.Types.DIRT,
            thickness: 1.5,
            value: 0
        };
    }
}

module.exports = Grass;