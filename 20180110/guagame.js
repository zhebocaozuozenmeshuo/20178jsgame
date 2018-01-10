// 瓜
var GuaGame = function (images, runCallback) {
    // images 是一个对象，里面是图片的引用名字和图片路径
    // 程序会在所有图片载入成功后才运行
    var g = {
        actions: {},
        keydowns: {},
        images: {},
    }
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    // draw
    g.drawIamge = function (guaImage) {
        g.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
    }
    // events
    window.addEventListener('keydown', function (event) {
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup', function (event) {
        g.keydowns[event.key] = false
    })
    //
    g.registerAction = function (key, callback) {
        g.actions[key] = callback
    }

    window.fps = 60
    // timer
    var runloop = function () {
        // events
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                // 如果按键被按下 调用回调函数
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        context.clearRect(0, 0, canvas.width, canvas.height)
        // draw
        g.draw()
        // next run loop
        setTimeout(function () {
            runloop()
        }, 1000 / fps)
    }
    //
    var loads = []
    // 预先载入所有图片
    var names = Object.keys(images)
    for (var i = 0; i < names.length; i++) {
        let name = names[i]
        var path = images[name];
        let img = new Image()
        img.src = path
        img.onload = function() {
            // 存入 g.images 中
            g.images[name] = img
            loads.push(1)
            // 所有图片都成功载入之后, 调用 run
            if (loads.length == names.length) {
                g.run()
            }
        }
    }
    g.imageByName = function (name) {
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    } 
    g.run = function () {
        runCallback(g)
        // 开始运行程序
        setTimeout(function () {
            log(fps)
            runloop()
        }, 1000 / fps)
    }
    return g
}
