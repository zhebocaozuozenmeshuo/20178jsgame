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
        sky: 'img/sky.png',
        cloud: 'img/cloud.png',
        player: 'img/player.png',
        bullet: 'img/bullet.png',
        enemy0: 'img/enemy0.png',
        enemy1: 'img/enemy1.png',
        enemy2: 'img/enemy2.png',
        enemy3: 'img/enemy3.png',
        enemy4: 'img/enemy4.png',
        fire: 'img/fire.png',
        // 跑步动画
        // r1: 'img/running/r1.png',
        // r2: 'img/running/r2.png',
        // r3: 'img/running/r3.png',
        // r4: 'img/running/r4.png',
        // 多状态动画
        // 空闲
        spear1: 'img/player-spear/player-spear-0.png',
        spear2: 'img/player-spear/player-spear-1.png',
        spear3: 'img/player-spear/player-spear-2.png',
        spear4: 'img/player-spear/player-spear-3.png',
        spear5: 'img/player-spear/player-spear-4.png',
        spear6: 'img/player-spear/player-spear-5.png',
        spear7: 'img/player-spear/player-spear-6.png',
        spear8: 'img/player-spear/player-spear-7.png',
        // 跑步
        r1: 'img/running/r1.png',
        r2: 'img/running/r2.png',
        r3: 'img/running/r3.png',
        r4: 'img/running/r4.png',
        //
        cave: 'img/cave.png'
    }

    var game = GuaGame.instance(images, function(g) {
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(true, game)
}
__main()