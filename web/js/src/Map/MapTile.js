/** @typedef {import("../Grid/Tile.js")} Tile */
/** @typedef {import("./Map.js")} Map */
const Sprite = require("../Sprite.js");

/**
 * Used mostly for the player to determine if the tile is breakable and other properties of said tile.
 */
class MapTile extends createjs.Bitmap {
    /**
     * @param {Map} map The map that created this tile.
     * @param {Tile} tile Contains information about this MapTile's position.
     * @param {string} appearance Determines what the tile will look like when drawn on the map.
     * @param {Object} properties Contains properties about this MapTile.
     */
    constructor(map, tile, appearance, properties) {
        super(map.game.spriteHandler);
        this.map = map;
        this.tile = tile;
        this.properties = properties;
        this.appearance = appearance;
    }

    make() {
        // TODO: Make more versatile.
        const img = this.map.game.images[this.appearance];
        this.image = img;
        this.scaleX = 50 / 64;
        this.scaleY = 50 / 64;
        this.x = this.tile.gX * this.map.grid.tileSize;
        this.y = this.tile.gY * this.map.grid.tileSize;
        // this.drawImageRect(this.map.game.images[this.appearance], this.tile.gX * this.map.grid.tileSize, this.tile.gY * this.map.grid.tileSize, 50, 50);
        // this.graphics.beginBitmapFill(image).drawRect(x, y, width, height);
    }
}

module.exports = MapTile;