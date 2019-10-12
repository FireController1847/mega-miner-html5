/** @typedef {import("../MapTile.js").MapTileProperties} MapTileProperties */
const MapTile = require("../MapTile.js");

class Coal extends MapTile {
    constructor(...args) {
        super(...args);

        /** @type {MapTileProperties} */
        this.properties = {
            type: MapTile.Type.COAL,
            thickness: 75,
            value: 20
        };
    }
}

module.exports = Coal;