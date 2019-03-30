class Sprite extends createjs.Shape {
    /**
     * @param {import("./Handler/SpriteHandler.js")} spriteHandler The sprite handler
     * @param  {...any} args The arguments for this EaselJS Shape
     */
    constructor(spriteHandler, ...args) {
        super(...args);
        this.spriteHandler = spriteHandler;
    }

    drawImageRect(image, x, y, width, height) {
        this.graphics.beginBitmapFill(image).drawRect(x, y, width, height);
    }
}

module.exports = Sprite;