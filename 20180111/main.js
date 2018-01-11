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

    var game = GuaGame(images, function(g) {
        var s = Scene(g)
        g.runWithScene(s)
    })

    enableDebugMode(true, game)
}
__main()