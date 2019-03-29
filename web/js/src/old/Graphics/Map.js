const Grid = require("./Grid.js");

class Map {
    constructor(stage) {
        this.stage = stage;
    }

    test() {
        for (let i = 0; i < this.stage.grid.tiles.length; i++) {
            const image = new createjs.Bitmap(this.stage.loader.sprites[0].image);
            image.x = this.stage.grid.tiles[i].gX * this.stage.grid.tileSize;
            image.y = this.stage.grid.tiles[i].gY * this.stage.grid.tileSize;
            this.stage.addChild(image);
        }
        this.stage.update();
    }
}

module.exports = Map;