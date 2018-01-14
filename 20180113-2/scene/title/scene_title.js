class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function () {
            var s = Scene(game)
            game.replaceScene(s)
        })
    }

    draw() {
        this.game.context.fillText('按键说明', 170, 70)
        this.game.context.fillText('按 k 开始游戏', 160, 90)
        this.game.context.fillText('按 f 发射小球', 160, 110)
        this.game.context.fillText('按 p 暂停游戏', 160, 130)
        this.game.context.fillText('按 1,2,3 加载不同关卡', 150, 150)
        this.game.context.fillText('暂停状态下小球可以拖拽', 140, 170)
    }
}