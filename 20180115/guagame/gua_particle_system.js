class GuaParticle extends GuaImage {
    constructor(game) {
        super(game, 'fire')
        this.setup()
    }
    setup() {
        this.life = 30
    }
    init(x, y, vx, vy) {
        this.x = x
        this.vx = vx
        this.y = y
        this.vy = vy
    }
    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        var factor = 0.02
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }
}

class GuaParticleSystem {
    constructor(game) {
        this.game = game
        this.setup()
    }
    setup() {
        this.duration = 60
        this.x = 150
        this.y = 200
        this.numberOfParticles = 15
        this.particles = []
    }
    static new(game) {
        return new this(game)
    }
    draw() {
        for (var p of this.particles) {
            if (this.duration < 0) {
                // TODO, 这里应该从 scene 中删掉自己
                return
            }
            p.draw()
        }
    }
    update() {
        this.duration--
        // 添加小火花
        if (this.particles.length < this.numberOfParticles) {
            var p = GuaParticle.new(this.game)
            // 设置初始化坐标
            var s = 2
            var vx = randomBetween(-s, s)
            var vy = randomBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
        // 更新所有的小火花
        for (var p of this.particles) {
            p.update()
        }
        // 删除死掉的小火花
        this.particles = this.particles.filter(p => p.life > 0)
    }
}
