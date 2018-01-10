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
    // 控制皮肤
}
var __main = function () {

    var images = {
        ball: 'ball.png',
        block: 'block.png',
        paddle: 'paddle.png',
    }

    var images = {
        ball: 'ball1.png',
        block: 'block1.png',
        paddle: 'paddle1.png',
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
        // mouse event
        var enableDrag = false
        game.canvas.addEventListener('mousedown', function (event) {
            log(event)
            var x = event.offsetX
            var y = event.offsetY
            log(x, y, event)
            // 检查是否选中了 ball
            log(ball.hasPoint(x, y), 'ball.x: ', ball.x, 'ball.y :', ball.y, 'x: ', x, 'y: ', y )
            if (ball.hasPoint(x, y)) {
                // 设置拖拽状态
                log('进入拖拽')
                enableDrag = true
            }
        })
        game.canvas.addEventListener('mousemove', function (event) {
            var x = event.offsetX
            var y = event.offsetY
            if (enableDrag) {
                ball.x = x
                ball.y = y
                log(x, y, 'drag')
            }
        })
        game.canvas.addEventListener('mouseup', function (event) {
            log(event)
            var x = event.offsetX
            var y = event.offsetY
            log(x, y, 'up')
            enableDrag = false
        })
        game.draw = function () {
            // draw 背景
            game.context.fillStyle = '#555'
            game.context.fillRect(0, 0, 400, 300)
            // draw
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