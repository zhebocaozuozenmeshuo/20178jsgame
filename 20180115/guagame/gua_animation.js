class GuaAnimation {
    constructor(game) {
        this.game = game
        // 为了省事， 在这里硬编码 hard code 一套动画
        this.animations = {
            spear: [],
            run: [],
        }
        for (var i = 1; i < 8; i++) {
            log(i)
            var name = `spear${i}`
            var t = game.textureByName(name)
            this.animations.spear.push(t)
        }
        for (var i = 1; i < 5; i++) {
            var name = `r${i}`
            var t = game.textureByName(name)
            this.animations.run.push(t)
        }
        this.animationName = 'spear'
        this.texture = this.frames()[0]
        this.frameIndex = 0
        this.frameCount = 15
        this.w = this.texture.width
    }
    static new(game) {
        return new this(game)
    }
    frames() {
        return this.animations[this.animationName]
    }
    update() {
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 15
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    draw() {
        var context = this.game.context
        if(this.flipX) {
            context.save()
            
            var x = this.x + this.w / 2
            context.translate(x, 0)
            context.scale(-1, 1)
            context.translate(-x, 0)
            
            context.drawImage(this.texture, this.x, this.y)

            context.restore()
        } else {
            this.game.drawImage(this)
        }
    }
    move(x, keyStatus) {
        // emms
        // if (x < 0) {
        //     this.flipX = true
        // } else {
        //     this.flipX = false
        // }
        this.flipX = x < 0
        this.x += x
        log(this.flipX)
        var aniationNames = {
            down: 'run',
            up: 'spear',
        }
        var name = aniationNames[keyStatus]
        this.changeAnimation(name)
        
    }
    changeAnimation(name){
        this.animationName = name
    }
}

// class GuaAnimation {
//     constructor(game) {
//         this.game = game
//         // 为了省事， 在这里硬编码 hard code 一套动画
        
//         this.frames = []
//         for (var i = 1; i < 5; i++) {
//             var name = `r${i}`
//             var t = game.textureByName(name)
//             this.frames.push(t)
//         }
//         this.texture = this.frames[0]
//         this.frameIndex = 0
//         this.frameCount = 15
//     }
//     static new(game) {
//         return new this(game)
//     }
//     update() {
//         this.frameCount--
//         if (this.frameCount == 0) {
//             this.frameCount = 15
//             this.frameIndex = (this.frameIndex + 1) % this.frames.length
//             this.texture = this.frames[this.frameIndex]
//         }
//     }
//     draw() {
//         this.game.drawImage(this)
//     }
//     move(x) {
//         this.x += x
//     }
// }