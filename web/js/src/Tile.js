class Tile extends createjs.Shape {
    constructor(x, y, ...args) {
        super(...args);

        this._x = x;
        this._y = y;
    }

    place(xPos, yPos, size, color = "black") {
        this.graphics.beginFill(color).drawRect(xPos, yPos, size, size);
    }

    getPosition() {
        return { x: this._x, y: this._y };
    }

    setPosition(x, y) {
        this._x = x;
        this._y = y;
    }
}

module.exports = Tile;