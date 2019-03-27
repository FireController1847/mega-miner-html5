const { ShapeUtil, Borders } = require("./ShapeUtil.js");

// Note: Not really a camera. More of a controller that follows the player.
// Wait, isn't that the defintion of a camera?
// Whatever.
class Camera {
    constructor(stage) {
        this._stage = stage;
        stage.camera = this;

        this.viewport = new Borders(
            0,
            0,
            this.stage.canvas.width,
            this.stage.canvas.height
        );
        this.tickEnabled = true;
    }

    tick() {
        if (!this.tickEnabled) return;
        this.stage.player.xCenter = this.stage.player.x + (this.stage.player.size / 2);
        this.stage.player.yCenter = this.stage.player.y + (this.stage.player.size / 2);

        if (this.viewport.right != (this.stage.canvas.width / this.stage.scaleX)) this.viewport.right = this.stage.canvas.width / this.stage.scaleX;
        if (this.viewport.bottom != (this.stage.canvas.height / this.stage.scaleY)) this.viewport.bottom = this.stage.canvas.height / this.stage.scaleY;

        // Handle Horizontal
        if (this.stage.player.xCenter - this.viewport.left + this.leftDeadZone > this.viewport.right) {
            this.viewport.left = (this.stage.player.xCenter - (this.viewport.right - this.leftDeadZone)) * this.stage.scaleX;
        } else if (this.stage.player.xCenter - this.leftDeadZone < this.viewport.left) {
            this.viewport.left = (this.stage.player.xCenter - this.leftDeadZone) * this.stage.scaleX;
        }

        // Handle Vertical
        if (this.stage.player.yCenter - this.viewport.top + this.topDeadZone > this.viewport.bottom) {
            this.viewport.top = (this.stage.player.yCenter - (this.viewport.bottom - this.topDeadZone)) * this.stage.scaleY;
        } else if (this.stage.player.yCenter - this.topDeadZone < this.viewport.top) {
            this.viewport.top = (this.stage.player.yCenter - this.topDeadZone) * this.stage.scaleY;
        }

        // Stop At World Boundaries
        if (!ShapeUtil.within(this.viewport, this.stage.grid.borders)) {
            if (this.viewport.top < this.stage.grid.borders.top) {
                this.viewport.top = this.stage.grid.borders.top;
            }
            if (this.viewport.left < this.stage.grid.borders.left) {
                this.viewport.left = this.stage.grid.borders.left;
            }
            if ((this.viewport.bottom + (this.viewport.top / this.stage.scaleY)) > this.stage.grid.borders.bottom) {
                this.viewport.top = (this.stage.grid.borders.bottom - this.viewport.bottom) * this.stage.scaleY;
            }
            if ((this.viewport.right + (this.viewport.left / this.stage.scaleY)) > this.stage.grid.borders.right) {
                this.viewport.left = (this.stage.grid.borders.right - this.viewport.right) * this.stage.scaleX;
            }
        } else {
            console.log("WITHIN: " + ShapeUtil.within(this.viewport, this.stage.grid.borders));
        }

        this.stage.x = -this.viewport.left;
        this.stage.y = -this.viewport.top;
    }

    // Distance from the edge of the screen before camera moves (top and left)
    get leftDeadZone() {
        return (this.stage.canvas.width / this.stage.scaleX) / 2;
    }

    get topDeadZone() {
        return (this.stage.canvas.height / this.stage.scaleY) / 2;
    }

    get stage() {
        return this._stage;
    }
}

module.exports = Camera;