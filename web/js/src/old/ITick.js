class ITick {
    constructor() {
        this.tickEnabled = true;
    }
    tick() {
        throw new Error("Not Implemented!");
    }
}

module.exports = ITick;