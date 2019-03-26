// Note: Not really a camera. More of a controller that follows the player.
// Wait, isn't that the defintion of a camera?
// Whatever.
class Camera {
    constructor(stage) {
        this._stage = stage;
        stage.camera = this;

        const camera = this;
        this.viewport = {
            x: 0,
            y: 0,
            get width() {
                return camera.stage.canvas.width;
            },
            get height() {
                return camera.stage.canvas.height;
            }
        };
        this.borders = {
            top: 0,
            left: 0,
            get bottom() {
                return camera.stage.grid.borders.bottom;
            },
            get right() {
                return camera.stage.grid.borders.right;
            },
            within(borders) {
                return borders.top <= this.top &&
                        borders.left <= this.left &&
                        borders.bottom >= this.bottom &&
                        borders.right >= this.right;
            }
        };
    }

    tick() {
        this.stage.player.xCenter = this.stage.player.x + (this.stage.player.size / 2);
        this.stage.player.yCenter = this.stage.player.y + (this.stage.player.size / 2);

        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // THIS DOES NOT WORK!!!! FIX IT!
        //
        //              Ideas
        // Possible conflicts with canvas width instead of window width
        // Possible odd behavior with canvas changing size
        // Camera cannot be allowed to go outside the grid view...
        // -- This can happen on larger screens.
        // -- Without a smaller grid, or for that matter a smaller canvas, it wont work.
        // -- What do I do if the screen is larger than the map!??
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        // Handle Horizontal
        if (this.stage.player.xCenter - this.viewport.x + this.xDeadZone > this.viewport.width) {
            this.viewport.x = this.stage.player.xCenter - (this.viewport.width - this.xDeadZone);
        } else if (this.stage.player.xCenter - this.xDeadZone < this.viewport.x) {
            this.viewport.x = this.stage.player.xCenter - this.xDeadZone;
        }

        // Handle Vertical
        if (this.stage.player.yCenter - this.viewport.y + this.yDeadZone > this.viewport.height) {
            console.log("1");
            this.viewport.y = this.stage.player.yCenter - (this.viewport.height - this.yDeadZone);
        } else if (this.stage.player.yCenter - this.yDeadZone < this.viewport.y) {
            console.log("2");
            this.viewport.y = this.stage.player.yCenter - this.yDeadZone;
        }

        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // FIX START
        // NOT WORKING FOR OUTER GRID
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        this.borders.top = this.viewport.y;
        this.borders.left = this.viewport.x;

        // Stop At World Boundaries
        if (!this.borders.within(this.stage.grid.borders)) {
            if (this.borders.top < this.stage.grid.borders.top) {
                this.viewport.y = this.stage.grid.borders.top;
            }
            if (this.borders.left < this.stage.grid.borders.left) {
                this.viewport.x = this.stage.grid.borders.left;
            }
            if (this.borders.bottom > this.stage.grid.borders.bottom) {
                this.viewport.y = this.stage.grid.borders.bottom - this.viewport.height;
            }
            if (this.borders.right > this.stage.grid.borders.right) {
                this.viewport.x = this.stage.grid.borders.right - this.viewport.width;
            }
        }
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // FIX END
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        this.stage.x = -this.viewport.x;
        this.stage.y = -this.viewport.y;
    }

    // Distance from the edge of the screen before camera moves
    get xDeadZone() {
        return this.stage.canvas.width / 2;
    }

    get yDeadZone() {
        return this.stage.canvas.height / 2;
    }

    get stage() {
        return this._stage;
    }
}

module.exports = Camera;