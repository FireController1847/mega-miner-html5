/**
 * Manages and handles all things relating to the fog-of-war aspect of the game.
 */
class FOWHandler {
    /**
     * @param {import("../Game.js")} game The game.
     */
    constructor(game) {
        this.game = game;

        /**
         * A reference to the display handler for utility purposes.
         * @type {import("./DisplayHandler.js")}
         */
        this.dh = this.game.displayHandler;

        /**
         * The stage used for FOW
         * @type {createjs.Stage}
         */
        this.stage = new createjs.Stage(document.getElementById("fow"));
        this.game.nextStage = this.stage1;
        this.stage.nextStage = this.game;

        window.addEventListener("resize", () => { this.resize(); });
        this.init();
    }

    init() {
        /**
         * The actual fog shape for FOW
         * @type {createjs.Shape}
         */
        this.fow = new createjs.Shape();
        this.fow.graphics.beginFill("black").drawRect(0, this.dh.map.horizonLine + this.dh.grid.tileSize * 1.95, this.dh.grid.width, this.dh.grid.height);
        this.stage.addChild(this.fow);
        this.stage.update();

        /**
         * The shape that revelas that follows the player.
         * @type {createjs.Shape}
         */
        this.plrReveal = new createjs.Shape();
        this.plrReveal.graphics.beginFill("white").drawCircle(0, 0, this.dh.grid.tileSize * 2.5);
        this.plrReveal.compositeOperation = "destination-out";
        this.stage.addChild(this.plrReveal);
        this.stage.update();

        createjs.Ticker.addEventListener("tick", this.tick.bind(this));
        this.resize();
    }

    tick() {
        if (this.stage.x != this.game.x || this.stage.y != this.game.y) {
            this.stage.x = this.game.x;
            this.stage.y = this.game.y;
            this.stage.update();
        }
        if (this.plrReveal.x != this.dh.player.x || this.plrReveal.y != this.dh.player.y) {
            this.plrReveal.x = this.dh.player.x + this.dh.grid.tileSize / 2;
            this.plrReveal.y = this.dh.player.y + this.dh.grid.tileSize / 2;
            this.stage.update();
        }
    }

    /**
     * An event to handle following the player.
     */
    playerMove() {
        
    }

    /**
     * Resizes the canvas to the window.
     * Updates the stage.
     */
    resize(height = window.innerHeight, width = window.innerWidth) {
        this.stage.canvas.height = height;
        this.stage.canvas.width = width;
        this.stage.update();
    }
}

module.exports = FOWHandler;