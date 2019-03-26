const Stage = require("./Stage.js");
const Grid = require("./Grid.js");
const Player = require("./Player.js");
const Camera = require("./Camera.js");

const stage = new Stage("canvas");

const grid = new Grid(stage);
grid.draw(stage);

const player = new Player(stage);
const camera = new Camera(stage);

window.stage = stage;
window.grid = grid;
window.player = player;
window.camera = camera;

/*
const tileSize = 50;
const tileCount = 5;
const tilePixelCount = tileCount * (tileSize + 1);
const tiles = [];
window.tiles = function() { return tiles; };

let pos = 0;
for (let y = 0; y < tilePixelCount; y += tileSize + 1) {
    for (let x = 0; x < tilePixelCount; x += tileSize + 1) {
        const tile = new Tile(x, y, tileSize);
        if (Math.round(tileCount / 2) == x) {
            tile.place(x, y, tileSize, "red");
        } else if (pos % 2 <= 0) {
            tile.place(x, y, tileSize, "white");
        } else {
            tile.place(x, y, tileSize);
        }
        console.log("NEW TILE: " + JSON.stringify(tile.getPosition()));
        stage.addChild(tile);
        stage.update();
        pos++;
    }
}
/*
// Handle Window Resize
const shape = new createjs.Shape();
shape.graphics.beginFill("black").drawRect(0, 0, 120, 120);

stage.addChild(shape);
stage.update();

window.stage = stage;
window.Tile = Tile;

/*
//Draw a square on screen.
var stage = new createjs.Stage('myCanvas');
var shape = new createjs.Shape();
shape.graphics.beginFill('red').drawRect(0, 0, 120, 120);
stage.addChild(shape);
stage.update();
*/