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
         * A reference to the grid for utility purposes.
         * @type {import("../Grid/Grid.js")}
         */
        this.grid = this.game.displayHandler.grid;

        /**
         * A reference to the map for utility purposes.
         * @type {import("../Map/Map.js")}
         */
        this.map = this.game.displayHandler.map;

        /**
         * A reference to the player for utility purposes.
         * @type {import("../Player.js")}
         */
        this.player = this.game.displayHandler.player;

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
        this.stage.snapToPixelEnabled = true;
        /**
         * The actual fog shape for FOW
         * @type {createjs.Shape}
         */
        this.fow = new createjs.Shape();
        this.fow.graphics.beginFill("black").drawRect(0, this.map.horizonLine + this.grid.tileSize * 1.95, this.grid.width, this.grid.height);
        this.stage.addChild(this.fow);
        this.stage.update();

        /**
         * The shape that revelas that follows the player.
         * @type {createjs.Shape}
         */
        this.plrReveal = new createjs.Shape();
        this.plrReveal.graphics.beginFill("white").drawCircle(0, 0, this.grid.tileSize * 2.5);
        this.plrReveal.compositeOperation = "destination-out";
        this.stage.addChild(this.plrReveal);
        this.stage.update();

        /**
         * An object used to remember the position of each FOG tile.
         * @type {Object.<string, MapTile>}
         */
        this.fog_tiles = {};

        /**
         * A container used to contain all the "destination-out" graphics for each tile.
         * @type {createjs.Container}
         */
        this.tiles = new createjs.Container();

        // Initiate FOG tiles for entire surface.
        for (let i = 0; i < this.grid.widthGU; i++) {
            const fogtile = this.makeFogTile(i * this.grid.tileSize + this.grid.tileSize / 2, this.map.horizonLine - this.grid.tileSize / 2, this.grid.tileSize * 2.5);
            this.tiles.addChild(fogtile);
        }
        this.stage.addChild(this.tiles);

        this.player.addEventListener("tilemove", this.tilemove.bind(this));
        createjs.Ticker.addEventListener("tick", this.tick.bind(this));
        this.resize();
    }

    tick() {
        if (this.stage.x != this.game.x || this.stage.y != this.game.y) {
            this.stage.x = this.game.x;
            this.stage.y = this.game.y;
            this.stage.update();
        }
        if (this.stage.scaleX != this.game.scaleX || this.stage.scaleY != this.game.scaleY) {
            this.stage.scaleX = this.game.scaleX;
            this.stage.scaleY = this.game.scaleY;
            this.stage.update();
        }
        if (this.plrReveal.x != this.player.x || this.plrReveal.y != this.player.y) {
            this.plrReveal.x = this.player.x + this.grid.tileSize / 2;
            this.plrReveal.y = this.player.y + this.grid.tileSize / 2;
            this.stage.update();
        }
    }

    /**
     * Called every time the player moves a tile.
     * @param {CustomEvent} event
     */
    tilemove(event) {
        // console.log("TILE MOVE: ", event.detail);
        /** @type {import("../Grid/Tile.js")} */
        const tile = event.detail;
        if (tile.gY >= 9) {
            if (this.fog_tiles[tile.toString()]) return;
            const fogtile = this.makeFogTile(tile.gX * this.grid.tileSize + this.grid.tileSize / 2, tile.gY * this.grid.tileSize + this.grid.tileSize / 2, this.grid.tileSize * 2.5);
            this.stage.addChild(fogtile);
            // this.tiles.updateCache();
            // console.log("ADD", fogtile);
        }
    }

    /**
     * Convinience method for making a fog tile.
     * @returns {createjs.Shape}
     */
    makeFogTile(x, y, radius) {
        const fogtile = new createjs.Shape();
        fogtile.graphics.beginFill("white").drawCircle(x, y, radius);
        fogtile.compositeOperation = "destination-out";
        return fogtile;
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