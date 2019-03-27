const { Borders } = require("./ShapeUtil.js");
const Tile = require("./Tile.js");

class Grid {
    constructor(stage) {
        this._stage = stage;
        stage.grid = this;

        // Cell Size In Pixels
        this._cellSize = 50;

        // Map Dimentions (ex. 20 by 20)
        this._width = 40;
        this._height = 40;

        // Corners
        this.borders = new Borders(
            0, 0,
            this._height * this._cellSize,
            this._width * this._cellSize
        );

        // The tiles.
        this.tiles = [];
    }

    draw() {
        let x = 0;
        let y = 0;
        for (let yPos = 0; yPos < this._height * this._cellSize; yPos += this._cellSize) {
            x = 0;
            for (let xPos = 0; xPos < this._width * this._cellSize; xPos += this._cellSize) {
                const tile = new Tile(x, y);

                if ((Math.round(this._height / 2) == (y + 1)) &&
                    (Math.round(this._width / 2) == (x + 1))) {
                    tile.place(xPos + this.borders.left, yPos + this.borders.top, this._cellSize, "red");
                } else if (y % 2 <= 0 && x % 2 <= 0) {
                    tile.place(xPos + this.borders.left, yPos + this.borders.top, this._cellSize, "white");
                } else if (y % 2 > 0 && x % 2 <= 0) {
                    tile.place(xPos + this.borders.left, yPos + this.borders.top, this._cellSize);
                } else if (y % 2 <= 0 && x % 2 > 0) {
                    tile.place(xPos + this.borders.left, yPos + this.borders.top, this._cellSize);
                } else {
                    tile.place(xPos + this.borders.left, yPos + this.borders.top, this._cellSize, "white");
                }

                this.stage.addChild(tile);
                x++;
            }
            y++;
        }
        this.stage.update();
    }

    get cellSize() {
        return this._cellSize;
    }

    get height() {
        return this._height;
    }

    get width() {
        return this._width;
    }

    get stage() {
        return this._stage;
    }
}

module.exports = Grid;