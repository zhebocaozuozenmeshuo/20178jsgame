class GuaAnimation {
    constructor(game) {
        this.game = game
        // 为了省事， 在这里硬编码 hard code 一套动画
        this.animations = {
            idle: [],
        }
        for (var i = 1; i < 3; i++) {
            log(i)
            var name = `b${i}`
            var t = game.textureByName(name)
            this.animations.idle.push(t)
        }
        
        this.animationName = 'idle'
        this.texture = this.frames()[0]
        this.frameIndex = 0
        this.frameCount = 15
        this.w = this.texture.width
        this.h = this.texture.height

        this.rotation = 0
        this.alpha = 1
        // 重力和加速度
        this.gy = 10
        this.vy = 0
    }
    static new(game) {
        return new this(game)
    }
    frames() {
        return this.animations[this.animationName]
    }
    jump() {
        this.vy = -4
        this.rotation = -45
    }
    update() {
        // 更新 alpha
        if (this.alpha > 0) {
            this.alpha -= 0.05
        }
        // 更新受力
        this.y += this.vy
        this.vy  += this.gy * (1 / 60)
        var h = 510
        if(this.y > h) {
            this.y = h
        }
        // 更新角度
        if(this.rotation <= 45) {
            this.rotation ++
        }
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 15
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    draw() {
        var context = this.game.context
        context.save()
        
        var w2 = this.w / 2
        var h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2)
        if(this.flipX) {
            context.scale(-1, 1)
        }  
        // var alpha = context.globalAlpha
        context.globalAlpha = this.alpha
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)

        context.drawImage(this.texture, 0, 0)

        context.restore()
    }
    move(x, keyStatus) {
        // emms
        // if (x < 0) {
        //     this.flipX = true
        // } else {
        //     this.flipX = false
        // }
        this.flipX = (x < 0)
        this.x += x
    }
    changeAnimation(name){
        this.animationName = name
    }
}

