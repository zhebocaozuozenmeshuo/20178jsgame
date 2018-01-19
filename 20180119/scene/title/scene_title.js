class Pipes {
    constructor(game) {
        window.paused = false

        this.game = game
        this.pipes = []
        this.pipeSpace = 110
        this.管子横向间距 = 200 
        this.columsOfPipe = 3
        for (var i = 0; i < this.columsOfPipe; i++) {
            var p1 = GuaImage.new(game, 'pipe')
            p1.flipY = true
            p1.x = 500 + i * this.管子横向间距
            var p2 = GuaImage.new(game, 'pipe')
            p2.x = p1.x
            this.resetPipePosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }
    static new(game) {
        return new this(game)
    }
    resetPipePosition(p1, p2) {
        p1.y = randomBetween(-300, 0)
        p2.y = p1.y + p1.h + this.pipeSpace
    }
    update() {
        for (var p of this.pipes) {
            p.x -= 2
            if(p.x < -100) {
                p.x += this.管子横向间距 * this.columsOfPipe
            }            
        }

    }
    draw() {
        var context = this.game.context
        for(var p of this.pipes) {
            context.save()
        
            var w2 = p.w / 2
            var h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2)
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)
    
            context.drawImage(p.texture, 0, 0)
    
            context.restore()
        }
    }
}
class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
       
        // bg
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
        // 加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
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

    aInb(x, x1, x2) {
        return x >= x1 && x <= x2
    }

    update() {
        if(window.paused) {
            return
        }
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
        // dead
        if(this.b.y === 510){
            window.paused = true
            // this.game.scene = SceneEnd.new(this.game)
        }
        for(var p of this.pipe.pipes) {
            var b = this.b
            var aInb = this.aInb
            if(aInb(b.x, p.x, p.x + p.w) && aInb(b.y, p.y, p.y + p.h)) {
                window.paused = true
            }
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