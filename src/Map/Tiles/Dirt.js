/** @typedef {import("../MapTile.js").MapTileProperties} MapTileProperties */
const MapTile = require("../MapTile.js");

class Dirt extends MapTile {
    constructor(...args) {
        super(...args);

        /** @type {MapTileProperties} */
        this.properties = {
            type: MapTile.Type.DIRT,
            thickness: 75,
            value: 0
        };
    }
}

module.exports = Dirt;