class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
       
        // bg
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
        // 循环移动的地面
        this.grounds = []
        for (var i = 0; i < 30; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 19
            g.y = 540
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 5
        // bird
        var b = GuaAnimation.new(game)
        b.x = 180
        b.y = 200
        this.b = b
        this.addElement(b)

        this.setupInputs(b)
    }

    draw() {
        super.draw()
    }

    update() {
        super.update()
        // 地面移动
        this.skipCount --
        var offset = -5
        if(this.skipCount == 0) {
            this.skipCount = 4
            offset = 15
        }
        for (var i = 0; i < 30; i++) {
            var g = this.grounds[i]
            g.x += offset
        }
    }

    setupInputs(w) {
        var self = this
        var b = this.bird
        this.game.registerAction('a', function(keyStatus) {
            self.b.move(-2, keyStatus)
        })
        this.game.registerAction('d', function(keyStatus) {
            self.b.move(2, keyStatus)
        })
        this.game.registerAction('j', function(keyStatus) {
            self.b.jump()
        })
        window.addEventListener('mousedown', function() {
            self.b.jump()
        })
        window.addEventListener('click', function() {
            self.b.jump()
        })
    }
}