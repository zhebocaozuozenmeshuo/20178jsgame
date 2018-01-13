class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        this.bg = GuaImage.new(this.game, 'sky') 
        this.player = GuaImage.new(this.game, 'player')
        this.cloud = GuaImage.new(this.game, 'cloud')
        this.player.x = 100 
        this.player.y = 150 
        
        // this.game.registerAction('a', function () {
        //     paddle.moveLeft()
        // })

        // this.game.registerAction('d', function () {
        //     paddle.moveRight()
        // })

        // this.game.registerAction('f', function () {
        //     ball.fire()
        // })
        this.addElement(this.bg)
        this.addElement(this.player)
        this.addElement(this.cloud)
    }
    update() {
        this.cloud.y += .7
    }
    // draw() {
    //     // draw labels
    //     // this.game.drawIamge(this.bg)
    //     // this.game.drawIamge(this.player)
    // }
}

// var Scene = function (game) {
//     var s = {
//         game: game,
//     }
//     // 初始化
//     var paddle = Paddle(game)
//     var ball = Ball(game)

//     var score = 0

//     blocks = loadLevel(1, game)
    
//     game.registerAction('a', function () {
//         paddle.moveLeft()
//     })

//     game.registerAction('d', function () {
//         paddle.moveRight()
//     })

//     game.registerAction('f', function () {
//         ball.fire()
//     })

//     s.draw = function () {
//         // if(gameover) {
//         //     // 画游戏结束画面
//         //     return 
//         // } 
//         // draw 背景
//         game.context.fillStyle = '#555'
//         // game.context.fillRect(0, 0, 400, 300)
//         // draw
//         game.drawIamge(paddle)
//         game.drawIamge(ball)
//         // draw blocks
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.alive) {
//                 game.drawIamge(block)
//             }
//         }
//         // draw labels
//         game.context.fillText('Score: ' + score, 10, 290)
//     }

//     s.update = function () {
//         if (window.paused) {
//             return
//         }
//         ball.move()
//         // 判断游戏结束
//         if (ball.y > paddle.y + paddle.h) {
//             // 跳转到游戏结束的场景
//             var end = SceneEnd.new(game)
//             game.replaceScene(end)
//         }
//         // 判断相撞
//         if (paddle.collide(ball)) {
//             // 这里应该调用一个 ball.反弹() 来实现
//             ball.反弹()
//         }
//         // 判断 ball 和 blocks 相撞
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.collide(ball)) {
//                 block.kill()
//                 ball.反弹()
//                 log('相撞')
//                 // 更新分数
//                 score += 100
//             }
//         }
//     }

//     // mouse event
//     var enableDrag = false
//     game.canvas.addEventListener('mousedown', function (event) {
//         log(event)
//         var x = event.offsetX
//         var y = event.offsetY
//         log(x, y, event)
//         // 检查是否选中了 ball
//         log(ball.hasPoint(x, y), 'ball.x: ', ball.x, 'ball.y :', ball.y, 'x: ', x, 'y: ', y)
//         if (ball.hasPoint(x, y)) {
//             // 设置拖拽状态
//             log('进入拖拽')
//             enableDrag = true
//         }
//     })
//     game.canvas.addEventListener('mousemove', function (event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         if (enableDrag) {
//             ball.x = x
//             ball.y = y
//             log(x, y, 'drag')
//         }
//     })
//     game.canvas.addEventListener('mouseup', function (event) {
//         log(event)
//         var x = event.offsetX
//         var y = event.offsetY
//         log(x, y, 'up')
//         enableDrag = false
//     })
//     return s
// }