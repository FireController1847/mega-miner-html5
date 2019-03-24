const Stage = require("./Stage.js");
const stage = new Stage("canvas");

const shape = new createjs.Shape();
shape.graphics.beginFill("black").drawRect(0, 0, 120, 120);

stage.addChild(shape);
stage.update();

window.stage = stage;


/*
//Draw a square on screen.
var stage = new createjs.Stage('myCanvas');
var shape = new createjs.Shape();
shape.graphics.beginFill('red').drawRect(0, 0, 120, 120);
stage.addChild(shape);
stage.update();
*/