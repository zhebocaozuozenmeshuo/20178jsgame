class GuaScene {
    constructor(game) {
        this.game = game
        this.debugModeEnabled = true
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
        for (var e of this.elements) {
            // this.game.drawIamge(e)
            e.draw()
        }
    }
    update() {
        if (this.debugModeEnabled) {
            for (var i = 0; i < this.elements.length; i++) {
                var e = this.elements[i];
                e.debug && e.debug()
            }
        }
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i];
            e.update()
        }
    }

}
