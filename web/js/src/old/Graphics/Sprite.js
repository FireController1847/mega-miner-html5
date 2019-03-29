class Sprite extends createjs.LoadItem {
    constructor(id, filePath) {
        super();

        this.src = filePath;
        this.id = id;
        this.image = null;
        this.status = {
            loaded: false,
            errored: false,
            error: null
        };
    }
}

module.exports = Sprite;