var loadLevel = function (n, game) {
    var blocks = []
    n = n - 1
    var level = levels[n]
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        // 设置 block 坐标
        var b = Block(p, game)
        blocks.push(b)
    }
    return blocks
}

// var blocks = []
window.paused = false
var enableDebugMode = function (enable, game) {
    if (!enable) {
        return
    }
    window.addEventListener('keydown', function (event) {
        var k = event.key
        if (k == 'p') {
            window.paused = !window.paused
        } else if ('123'.includes(k)) {
            blocks = loadLevel(Number(k), game)
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function (event) {
        var input = event.target
        window.fps = Number(input.value)
    })
}
var __main = function () {

    var images = {
        ball: 'ball.png',
        block: 'block.png',
        paddle: 'paddle.png',
    }

    var game = GuaGame(images, function (g) {

        var paddle = Paddle(game)
        var ball = Ball(game)

        var score = 0

        blocks = loadLevel(1, game)

        game.registerAction('a', function () {
            paddle.moveLeft()
        })

        game.registerAction('d', function () {
            paddle.moveRight()
        })

        game.registerAction('f', function () {
            ball.fire()
        })

        game.update = function () {
            if (window.paused) {
                return
            }
            ball.move()
            // 判断相撞
            if (paddle.collide(ball)) {
                // 这里应该调用一个 ball.反弹() 来实现
                ball.反弹()
            }
            // 判断 ball 和 blocks 相撞
            for (var i = 0; i < blocks.length; i++) {
                var block = blocks[i]
                if (block.collide(ball)) {
                    block.kill()
                    ball.反弹()
                    log('相撞')
                    // 更新分数
                    score += 100
                }
            }
        }

        game.draw = function () {
            // draw
            // game.context.drawImage(paddle.image, paddle.x, paddle.y)
            game.drawIamge(paddle)
            game.drawIamge(ball)
            // draw blocks
            for (var i = 0; i < blocks.length; i++) {
                var block = blocks[i]
                if (block.alive) {
                    game.drawIamge(block)
                }
            }
            // draw labels
            game.context.fillText('Score: ' + score, 10, 290)
        }
    })
    enableDebugMode(true, game)

}
__main()