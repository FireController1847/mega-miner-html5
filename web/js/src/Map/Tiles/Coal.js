/** @typedef {import("../MapTile.js").MapTileProperties} MapTileProperties */
const MapTile = require("../MapTile.js");

class Coal extends MapTile {
    constructor(...args) {
        super(...args);

        /** @type {string} */
        this.appearance = "coal";

        /** @type {MapTileProperties} */
        this.properties = {
            type: MapTile.Types.DIRT,
            thickness: 1.5,
            value: 20
        };
    }
}

module.exports = Coal;