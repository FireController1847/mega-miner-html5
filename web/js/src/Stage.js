class Stage extends createjs.Stage {
    constructor(...args) {
        super(...args);

        // Options
        this.framerate = 60;

        // Keyboard Handler
        this.keys = {
            up: false,
            down: false,
            left: false,
            right: false
        };

        // Events
        window.addEventListener("resize", this.resize.bind(this));
        window.addEventListener("keydown", this.keydown.bind(this));
        window.addEventListener("keyup", this.keyup.bind(this));
        window.addEventListener("keypress", this.keypress.bind(this));
        createjs.Ticker.addEventListener("tick", this);

        // Ticker
        createjs.Ticker.framerate = this.framerate;

        this.resize();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.update();
    }

    keydown(e) {
        // Left Arrow
        if (e.keyCode == 37) {
            this.keys.left = true;
        // Up Arrow
        } else if (e.keyCode == 38) {
            this.keys.up = true;
        // Right Arrow
        } else if (e.keyCode == 39) {
            this.keys.right = true;
        // Down Arrow
        } else if (e.keyCode == 40) {
            this.keys.down = true;
        }
    }

    keyup(e) {
        // Left Arrow
        if (e.keyCode == 37) {
            this.keys.left = false;
        // Up Arrow
        } else if (e.keyCode == 38) {
            this.keys.up = false;
        // Right Arrow
        } else if (e.keyCode == 39) {
            this.keys.right = false;
        // Down Arrow
        } else if (e.keyCode == 40) {
            this.keys.down = false;
        }
    }

    keypress(e) {
        if (e.keyCode == 115) {
            this.update();
        }
    }

    tick() {
        if (this.player) this.player.tick();
        if (this.camera) this.camera.tick();
    }
}

module.exports = Stage;