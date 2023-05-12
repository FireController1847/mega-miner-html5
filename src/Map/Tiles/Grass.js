/** @typedef {import("../MapTile.js").MapTileProperties} MapTileProperties */
const MapTile = require("../MapTile.js");

class Grass extends MapTile {
    constructor(...args) {
        super(...args);

        /** @type {MapTileProperties} */
        this.properties = {
            name: "Grass",
            color: "#000",
            type: MapTile.Type.GRASS,
            thickness: 26.5,
            value: 0
        };
    }
}

module.exports = Grass;