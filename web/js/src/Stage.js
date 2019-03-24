class Stage extends createjs.Stage {
    constructor(...args) {
        super(...args);

        createjs.Ticker.addEventListener("tick", this.tick);
    }

    tick() {
        // todo: implement
    }
}

module.exports = Stage;