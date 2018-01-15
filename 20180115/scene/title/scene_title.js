class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var label = GuaLabel.new(game, 'hello from wong')
        this.addElement(label)

        // cave
        var cave = GuaImage.new(game, 'cave')
        this.addElement(cave)
        // player
        var w = GuaAnimation.new(game)
        w.x = 100
        w.y = 200
        this.w = w
        this.addElement(w)

        this.setupInputs(w)
    }

    draw() {
        super.draw()
    }

    setupInputs(w) {
        var self = this
        this.game.registerAction('a', function(keyStatus) {
            self.w.move(-2, keyStatus)
        })
        this.game.registerAction('d', function(keyStatus) {
            self.w.move(2, keyStatus)
        })
    }
}