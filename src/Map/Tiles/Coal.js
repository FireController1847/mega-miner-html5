/** @typedef {import("../MapTile.js").MapTileProperties} MapTileProperties */
const MapTile = require("../MapTile.js");

class Coal extends MapTile {
    constructor(...args) {
        super(...args);

        /** @type {MapTileProperties} */
        this.properties = {
            name: "Coal",
            color: "#000",
            type: MapTile.Type.COAL,
            thickness: 26.5,
            value: 20
        };
    }
}

module.exports = Coal;