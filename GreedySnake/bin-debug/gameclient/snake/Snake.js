var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 蛇蛇诶
 */
var Snake = (function (_super) {
    __extends(Snake, _super);
    // isJoyStick 是否通过摇杆操作，isButton是否添加加速，用于区分人机蛇与玩家
    function Snake(isJoyStick, isButton, snakeName) {
        var _this = _super.call(this) || this;
        _this.stringBuffer = ""; //数据缓冲区
        _this.snakeBodyList = []; // 蛇的全部节点
        _this.moveAngle = 0;
        _this.isSpeedUp = false;
        _this.speed = 5; // 蛇的基础移速
        _this.score = 0; // 蛇的基础得分
        _this.power = 0; // 蛇吸取食物的范围
        _this.isJoyStick = isJoyStick;
        _this.isButton = isButton;
        _this.snakeName = snakeName;
        _this.init(isJoyStick, isButton);
        return _this;
    }
    Snake.prototype.init = function (isJoyStick, isButton) {
        this.createNewSnake();
        this.addEventListener(egret.Event.ENTER_FRAME, this.snakeMoveAngle, this);
    };
    // 创建初始蛇
    Snake.prototype.createNewSnake = function () {
        // 龙骨动画创建蛇头
        this.snakeHead = new LiRuoLingXiao();
        this.snakeHead.x = Math.random() * 700 + 100;
        this.snakeHead.y = Math.random() * 700 + 100;
        // 设置子舞台的位置
        this.x = 0;
        this.y = 0;
        // 蛇名，一直在蛇头之上，限定宽度为十个字符
        var nameTx = new egret.TextField();
        this.snakeInfo = nameTx;
        nameTx.text = this.snakeName + '  ' + this.snakeBodyList.length;
        nameTx.x = this.snakeHead.x - 50;
        nameTx.y = this.snakeHead.y - 40;
        nameTx.width = 150;
        nameTx.height = 20;
        nameTx.size = 20;
        nameTx.verticalAlign = egret.VerticalAlign.MIDDLE;
        nameTx.textAlign = egret.HorizontalAlign.CENTER;
        nameTx.background = true;
        nameTx.backgroundColor = 0xff00ff;
        this.addChild(nameTx);
        // 添加至list
        this.snakeBodyList.push(this.snakeHead);
        this.addChild(this.snakeBodyList[this.snakeBodyList.length - 1]);
        // 指定蛇头索引为最大值
        this.setChildIndex(this.snakeBodyList[this.snakeBodyList.length - 1], -9999);
        // 蛇身初始长度为5
        for (var i = 0; i < 5; i++) {
            this.snakeBody();
        }
    };
    Snake.prototype.snakeBody = function () {
        var snakeBody = new egret.Shape();
        snakeBody.graphics.beginFill(Math.random() * 0xffffff);
        snakeBody.graphics.drawCircle(0, 0, 15);
        snakeBody.graphics.endFill();
        // 指定新增节点的位置在列表的最后一个节点,也就是蛇尾节点的位置小距离偏移
        snakeBody.x = this.snakeBodyList[this.snakeBodyList.length - 1].x + 20; // 30(直径)
        snakeBody.y = this.snakeBodyList[this.snakeBodyList.length - 1].y + 20;
        // 添加至list
        this.snakeBodyList.push(snakeBody);
        this.addChild(this.snakeBodyList[this.snakeBodyList.length - 1]); // this.addChild(snakeBody); 为什么不直接这样用？
        // 指定新增蛇身索引为最小值
        this.setChildIndex(this.snakeBodyList[this.snakeBodyList.length - 1], 0);
    };
    Snake.prototype.reduceBody = function () {
        this.removeChild(this.snakeBodyList[this.snakeBodyList.length - 1]);
        this.snakeBodyList.pop();
    };
    /**
        创建一个数组记录蛇移动路线轨迹上的坐标。
        蛇的每一节身体都按照这个路径点数组里的坐标移动。
        蛇移动的时候是帧事件，每帧更新蛇移动轨迹坐标的数组，更新蛇的每一节身体的坐标在蛇移动轨迹数组里对应的坐标。
        蛇移动方向是360度的方向都可以移动。
        移动的时候可以丝滑一点，别看着有断层。
     */
    Snake.prototype.snakeMoveAngle = function () {
        if (this.snakeBodyList.length != 0) {
            var moveAngle = 0;
            if (this.isJoyStick) {
                // 接受服务器传来的数据
                moveAngle = this.moveAngle;
            }
            else {
                moveAngle = Math.PI * Math.random() / 2;
                // 快要撞墙
                if (this.snakeBodyList[0].x < 15 || this.snakeBodyList[0].x > 985 || this.snakeBodyList[0].y < 15 || this.snakeBodyList[0].y > 985) {
                    moveAngle = -moveAngle;
                }
            }
            this.snakeMove(moveAngle);
        }
    };
    Snake.prototype.snakeMove = function (moveAngle) {
        // 蛇头坐标
        var snakeHeadX = this.snakeBodyList[0].x + this.speed * Math.cos(moveAngle);
        var snakeHeadY = this.snakeBodyList[0].y + this.speed * Math.sin(moveAngle);
        var tween;
        // 通过缓动动画实现蛇头的移动
        tween = egret.Tween.get(this.snakeBodyList[0])
            .to({ x: snakeHeadX, y: snakeHeadY }, 200 / this.speed);
        // 通过缓动动画实现蛇名的移动
        this.snakeInfo.text = this.snakeName + '  ' + this.snakeBodyList.length;
        tween = egret.Tween.get(this.snakeInfo)
            .to({ x: snakeHeadX - 50, y: snakeHeadY - 40 }, 200 / this.speed);
        // 通过缓动动画实现蛇身的移动
        // 利用tween动画实现更平滑的移动
        for (var i = this.snakeBodyList.length - 1; i >= 1; i--) {
            tween = egret.Tween.get(this.snakeBodyList[i])
                .to({ x: this.snakeBodyList[i - 1].x, y: this.snakeBodyList[i - 1].y }, 500 / this.speed);
        }
    };
    // // 蛇移动速度改变
    // private speedUp(){
    //     if (!this.isSpeedUp){
    //         console.log('speedup!');
    //         this.speed = 10;
    //         this.isSpeedUp = true;
    //     }
    //     else{
    //         console.log('speeddown!');
    //         this.speed = 5;
    //         this.isSpeedUp = false;
    //     }
    // }
    Snake.prototype.snakeRemoveBody = function () {
        for (var i = 0; i < this.snakeBodyList.length; i++) {
            this.removeChild(this.snakeBodyList[i]);
        }
    };
    // 服务器发送过来的数据
    Snake.prototype.webSocketDataHandler = function (event) {
        var str = this.gameSocket.readUTF();
        str = gameclient.util.ChatUtil.trim(str);
        if (str != "") {
            var stringBuffer = this.stringBuffer;
            stringBuffer += str;
            var index = stringBuffer.indexOf("</over>"); //查找结束符号
            while (index != -1) {
                var distr = stringBuffer.substring(0, index);
                stringBuffer = stringBuffer.substring(index + 7, stringBuffer.length);
                this.gameDataHelper(distr); //把数据转交个游戏数据分析方法处理
                index = stringBuffer.indexOf("</over>"); //查找结束符号
            }
            this.stringBuffer = stringBuffer;
        }
    };
    /* 游戏数据分析方法
    * 游戏数据处理类,该类中发现如果回来的数据为本类处理的数据
    * 则处理数据,如果是GameLogicEngine类处理的数据,就把数据传送给GameLogicEngine类的gameDataHelper方法
    */
    Snake.prototype.gameDataHelper = function (xmlStr) {
        // egret.log(xmlStr);
        var tempList = gameclient.socketdata.XmlDataHelper.dateHelper(xmlStr); //解析数据,返回数据组数,如果该数组为null,表示不能解析成功
        if (tempList != null) {
            if (tempList[0] == "SnakeMove") {
                this.moveAngle = parseFloat(tempList[1]);
                console.log(this.moveAngle);
            }
        }
    };
    return Snake;
}(egret.Sprite));
__reflect(Snake.prototype, "Snake");
//# sourceMappingURL=Snake.js.map