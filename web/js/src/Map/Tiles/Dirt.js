/** @typedef {import("../MapTile.js").MapTileProperties} MapTileProperties */
const MapTile = require("../MapTile.js");

class Dirt extends MapTile {
    constructor(...args) {
        super(...args);

        /** @type {MapTileProperties} */
        this.properties = {
            type: MapTile.Type.DIRT,
            thickness: 1.5,
            value: 0
        };
    }
}

module.exports = Dirt;