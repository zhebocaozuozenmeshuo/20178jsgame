var explain = `
      day07完成:
      01: 添加 GuaImage 类
      02: 自动绘制每一帧的元素
      03: 图片后面还要扣一下
      04: 添加敌机
      05: 添加子弹
      --: 3341

      day06完成:
      01: 添加开始和结束场景
      02: 面向对象封装    
 
      day05完成:
      01: 场景抽象 
      02: 游戏可以结束啦~     

      day04完成:
      01: 添加新的游戏素材
      02: 添加背景
      03: 添加拖拽
      
      day03完成:
      01: 完成计分功能
      02: 加入打印 log 功能
      03: 解决图片异步加载 js 回调噩梦...

      day02完成:
      core: 添加关卡功能
      按键 1， 2， 3 分别可以载入第一、二、三关
      （对应不同砖块数量）  
      01: 添加砖块元素 添加小球与砖块相撞逻辑
          消灭空气墙 （小球偶尔还会打穿砖块4）
          解决bug的办法之一是把球变小
      02: 添加挡板撞墙逻辑 
      03: 按 p 键暂停游戏
      04: 添加砖块的生命值，部分砖块需要打好多下才会消失
      05：添加游戏速度控制的功能

      day01 完成:  
      01: 按 a 键挡板向左移动 按 d 键挡板向右移动 
      02: 按 f 键发射小球 小球与挡板碰撞反弹 
      总结： 封装。 
    `
// document.querySelector('.explain').innerText = explain
// var e = sel => document.querySelector(sel)
// var log = function(s) {
//     e('#id-text-log').value += '\n' + s
// }
var log = console.log.bind(console)
// log(explain)
var imageFromPath = function (path) {
    var img = new Image()
    img.src = path
    return img
}

var rectIntersects = function (a, b) {
    if (b.y > a.y && b.y < a.y + a.image.height) {
        if (b.x > a.x && b.x < a.x + a.image.width) {
            return true
        }
    }
    return false
}

const randomBetween = function(start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}