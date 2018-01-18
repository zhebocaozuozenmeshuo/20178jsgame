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
            // blocks = loadLevel(Number(k), game)
        }
    })
}

var __main = function () {
    var images = {
        // flappy bird images
        bg: 'bird/bg.png',
        ground: 'bird/ground-1.png',
        b1: 'bird/b1.png',
        b2: 'bird/b2.png',
        b3: 'bird/b3.png',
    }

    var game = GuaGame.instance(images, function(g) {
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(true, game)
}
__main()