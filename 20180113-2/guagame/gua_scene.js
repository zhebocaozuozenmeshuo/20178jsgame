class GuaScene {
    constructor(game) {
        this.game = game
        this.elements = []
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    addElement(img) {
        // img is GuaImage
        img.scene = this
        this.elements.push(img)
    }
    draw() {
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i];
            this.game.drawIamge(e)
        }
    }
    update() {
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i];
            e.update()
        }
    }

}
