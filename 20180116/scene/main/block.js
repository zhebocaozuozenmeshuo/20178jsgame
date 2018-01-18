var Block = function (position, game) {
    // position 是一个 [0, 0] 格式
    var p = position
    var img = game.imageByName('block')
    var o = {
        x: p[0],
        y: p[1],
        alive: true,
        lifes: p[2] || 1,
    }
    o.image = img.image
    o.kill = function () {
        o.lifes--
        if (o.lifes < 1) {
            o.alive = false
        }
    }
    o.collide = function (b) {
        return o.alive && (rectIntersects(o, b) || rectIntersects(b, o))
    }
    return o
}
