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
var gameclient;
(function (gameclient) {
    var engine;
    (function (engine) {
        var StartGame = (function (_super) {
            __extends(StartGame, _super);
            function StartGame() {
                var _this = _super.call(this) || this;
                _this.stringBuffer = ""; //数据缓冲区
                _this.connectServer();
                return _this;
                // this.addEventListener(egret.Event.ADDED_TO_STAGE, this.gameScene, this);
            }
            StartGame.prototype.gameScene = function () {
                // 游戏背景
                var bgGame = new egret.Bitmap(RES.getRes("bgGame_jpg"));
                bgGame.width = this.stage.stageWidth;
                bgGame.height = this.stage.stageHeight;
                // 将舞台背景置于最底层
                this.addChildAt(bgGame, 0);
                // 初始化
                var clock = new Clock(0, 0, 10);
                this.clock = clock;
                this.addChild(clock);
                // 添加蛇
                this.createSnakes();
                var scoreScroller = new MyScroller(this.snakeList);
                this.scoreScroller = scoreScroller;
                this.addChild(scoreScroller);
                // 利用帧事件监听游戏结束
                egret.startTick(this.gameOver, this);
            };
            StartGame.prototype.createSnakes = function () {
                // 可以接受登录端的信息，为每一个登录的玩家创建一条以他们昵称起名的蛇
                var snakeList = [];
                this.snakeList = snakeList;
                var mySnake = new Snake(true, true, "hhhh");
                this.mySnake = mySnake;
                this.addChild(mySnake);
                snakeList.push(mySnake);
                var message = gameclient.socketdata.SendXmlHelper.buildSnakeScoreXml(mySnake.snakeName, mySnake.score);
                this.sendXmlToServer(message);
                for (var i = 0; i < 5; i++) {
                    var AISnake = new Snake(false, false, "000" + i.toString());
                    this.addChild(AISnake);
                    snakeList.push(AISnake);
                    var tempMessage = gameclient.socketdata.SendXmlHelper.buildSnakeScoreXml(AISnake.snakeName, AISnake.score);
                    this.sendXmlToServer(tempMessage);
                }
                var snakeFood = new SnakeFood();
                this.snakeFood = snakeFood;
                this.addChild(snakeFood);
                var collisionDetection = new CollisionDetection(snakeList, snakeFood, this.gameSocket);
                this.collisionDetection = collisionDetection;
                // 帧事件监听碰撞
                egret.startTick(collisionDetection.snakeCollisionDetection, this);
            };
            StartGame.prototype.gameOver = function () {
                // 游戏结束，展示得分面板
                if (this.clock.clockStatus) {
                    console.log('gameover');
                    this.snakeFood.stopCreateFood();
                    egret.stopTick(this.collisionDetection.snakeCollisionDetection, this);
                    egret.MainContext.instance.stage;
                    // 移出监听报错
                    for (var i = 0; i < this.snakeList.length; i++) {
                        if (this.snakeList[i]) {
                            this.snakeList[i].removeEventListener(egret.TouchEvent.ENTER_FRAME, this.snakeList[i].snakeMoveAngle, this.snakeList[i]);
                        }
                    }
                    egret.stopTick(this.gameOver, this);
                    this.snakeScore();
                    return false; // 游戏结束，结束监听
                }
                return true;
            };
            StartGame.prototype.snakeScore = function () {
                var scoreTx = new egret.TextField();
                this.addChild(scoreTx);
                // if(this.mySnake){
                //     scoreTx.text = "最终得分：" + this.mySnake.score;
                // }
                scoreTx.text = "游戏结束";
                scoreTx.size = 40;
                scoreTx.textColor = 0x00ff00;
                scoreTx.verticalAlign = egret.VerticalAlign.MIDDLE;
                scoreTx.textAlign = egret.HorizontalAlign.CENTER;
                scoreTx.x = 250;
                scoreTx.y = 350;
                scoreTx.width = 500;
                scoreTx.height = 300;
                scoreTx.background = true;
                scoreTx.backgroundColor = 0xffff99;
                scoreTx.alpha = 0.7;
            };
            StartGame.prototype.connectServer = function () {
                var url = "192.168.1.30"; // localhost
                var port = 8205;
                // websocket
                var gameSocket = this.gameSocket;
                if (gameSocket != null) {
                    this.disposeGameSocket();
                }
                gameSocket = new egret.WebSocket(); //构造socket
                this.gameSocket = gameSocket;
                gameSocket.addEventListener(egret.Event.CLOSE, this.closeHandler, this); //socket关闭
                gameSocket.addEventListener(egret.Event.CONNECT, this.connectHandler, this); //socket连接
                gameSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.ioErrorHandler, this); //socket ioError
                gameSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.webSocketDataHandler, this); //接收数据
                gameSocket.connect(url, port); //链接socket 
                // 发送游戏开始时间戳
            };
            //发送数据到服务器端
            StartGame.prototype.sendXmlToServer = function (xmlStr) {
                //websocket
                var gameSocket = this.gameSocket;
                if (gameSocket != null && gameSocket.connected == true) {
                    // this.gameSocket.writeUTFBytes(xmlStr + "\n");
                    gameSocket.writeUTF(xmlStr + "\n");
                    gameSocket.flush(); //对套接字输出缓冲区中积累的所有数据进行刷新
                    console.log("successfully send");
                }
                else {
                    console.log("failed to send");
                }
            };
            // private clickLoginBtn2(event: egret.Event): void {
            //     let sendXml: string = socketdata.SendXmlHelper.buildUserLoginXml("testuser2","222222");//构造活跃信息xml
            //     this.sendXmlToServer(sendXml);//发送xml文档到服务器
            // }
            // 服务器发送过来的数据
            StartGame.prototype.webSocketDataHandler = function (event) {
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
            StartGame.prototype.gameDataHelper = function (xmlStr) {
                // egret.log(xmlStr);
                var tempList = gameclient.socketdata.XmlDataHelper.dateHelper(xmlStr); //解析数据,返回数据组数,如果该数组为null,表示不能解析成功
                if (tempList != null) {
                    var tempstr = tempList[0];
                    switch (tempstr) {
                        case ("SnakeMove"):// 蛇移动角度
                            // let angle = parseInt(tempList[1]);
                            // for(let i = 0; i < this.snakeList.length; this){
                            //     if(tempList[2] == this.snakeList[i].snakeName){
                            //         this.snakeList[i].moveAngle = angle;
                            //     }
                            // }
                            var angle = parseInt(tempList[1]);
                            this.mySnake.moveAngle = angle;
                            break;
                    }
                }
            };
            /**
             * 释放Socket连接
             */
            StartGame.prototype.disposeGameSocket = function () {
                // 测试：websocket
                var gameSocket = this.gameSocket;
                if (gameSocket != null) {
                    if (gameSocket.hasEventListener(egret.Event.CLOSE)) {
                        gameSocket.removeEventListener(egret.Event.CLOSE, this.closeHandler, this);
                    }
                    if (gameSocket.hasEventListener(egret.Event.CONNECT)) {
                        gameSocket.removeEventListener(egret.Event.CONNECT, this.connectHandler, this);
                    }
                    if (gameSocket.hasEventListener(egret.IOErrorEvent.IO_ERROR)) {
                        gameSocket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.ioErrorHandler, this);
                    }
                    if (gameSocket.hasEventListener(egret.ProgressEvent.SOCKET_DATA)) {
                        gameSocket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.webSocketDataHandler, this);
                    }
                    gameSocket.close(); //关闭连接
                    this.gameSocket = null;
                }
            };
            //连接关闭
            StartGame.prototype.closeHandler = function (event) {
                console.log("连接关闭");
            };
            //socket连接成功
            StartGame.prototype.connectHandler = function (event) {
                console.log("连接成功");
                this.gameScene();
            };
            //连接失败
            StartGame.prototype.ioErrorHandler = function (event) {
                console.log("连接失败");
            };
            return StartGame;
        }(egret.DisplayObjectContainer));
        engine.StartGame = StartGame;
        __reflect(StartGame.prototype, "gameclient.engine.StartGame");
    })(engine = gameclient.engine || (gameclient.engine = {}));
})(gameclient || (gameclient = {}));
//# sourceMappingURL=StartGame.js.map