class Player extends createjs.Shape {
    /** @param {createjs.Stage} stage */
    constructor(stage, ...args) {
        super(...args);
        this._stage = stage;
        stage.player = this;

        this.size = 50;

        this.graphics.beginFill("blue").drawRect(0, 0, this.size, this.size);
        stage.addChild(this);
        stage.update();
    }

    tick() {
        const speed = 10;
        if (this.stage.keys.down) {
            if (this.y < this.stage.grid.borders.bottom) this.y += speed;
        }
        if (this.stage.keys.up) {
            if (this.y > 0) this.y -= speed;
        }
        if (this.stage.keys.right) {
            if (this.x < this.stage.grid.borders.right) this.x += speed;
        }
        if (this.stage.keys.left) {
            if (this.x > 0) this.x -= speed;
        }
    }

    get stage() {
        return this._stage;
    }
}

module.exports = Player;