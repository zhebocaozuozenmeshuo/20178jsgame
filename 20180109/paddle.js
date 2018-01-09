var Paddle = function (game) {
    var o = game.imageByName('paddle')
    // var o = {
    //     image: image,
    //     x: 130,
    //     y: 277,
    //     speed: 5,
    // }
    o.speed = 5
    o.x = 130
    o.y = 277
    o.move = function (x) {
        if (x < 0) {
            x = 0
        }
        if (x > 400 - o.image.width) {
            x = 400 - o.image.width
        }
        o.x = x
    }
    o.moveLeft = function () {
        o.move(o.x -= o.speed)
    }
    o.moveRight = function () {
        o.move(o.x += o.speed)
    }
    o.collide = function (ball) {
        // 判断矩形相交
        if (ball.y + ball.image.height > o.y) {
            if (ball.x > o.x && ball.x < o.x + o.image.width) {
                return true
            }
        }
        return false
    }
    return o
}