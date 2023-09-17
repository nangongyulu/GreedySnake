/**
 * 四：蛇碰撞检测（collision detection）
 * 蛇是可以吃糖豆的，判断蛇头与糖豆之间的距离，如果这个距离<某个值,蛇就可以吃糖豆，吃糖豆是一个动态变化过程，
 * 豆子移动到蛇头附近再消失，同时给蛇在蛇尾增加一节长度，也就是加一个圆圈。
 * 蛇头移动超出地图边界会死亡。
 * 蛇头与蛇头碰撞，长度小的会死亡。
 * 蛇头碰到自己的身体不会死亡，蛇头碰到其他蛇的身体会死亡。
 * 判断蛇头与其他蛇身体的之间的距离，
 */
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
var CollisionDetection = (function (_super) {
    __extends(CollisionDetection, _super);
    function CollisionDetection(snakeList, snakeFood, gameSocket) {
        var _this = _super.call(this) || this;
        _this.stringBuffer = ""; // 数据缓冲
        _this.snakeCollisionDetection = function () {
            // 对糖豆进行边缘检测，生成在边界的糖豆删除后重新生成
            for (var i = 0; i < _this.snakeFood.foodList.length; i++) {
                if (_this.foodHitBorder(_this.snakeFood.foodList[i])) {
                    _this.snakeFood.outFood(_this.snakeFood.foodList[i]);
                }
            }
            // 对每条蛇进行边缘检测以及吃糖豆检测
            for (var i = 0; i < _this.snakeList.length; i++) {
                if (_this.snakeList[i].snakeBodyList.length >= 1) {
                    // 将蛇头坐标填入egret.Point()
                    var snakeHeadPoint = new egret.Point();
                    snakeHeadPoint.x = _this.snakeList[i].snakeBodyList[0].x;
                    snakeHeadPoint.y = _this.snakeList[i].snakeBodyList[0].y;
                    // 蛇是可以吃糖豆的，判断蛇头与糖豆之间的距离，如果这个距离小于16(蛇头半径+1),蛇就可以吃糖豆，吃糖豆是一个动态变化过程，
                    // 豆子移动到蛇头附近再消失，同时给蛇在蛇尾增加一节长度，也就是加一个圆圈。
                    var eatenFood = _this.snakeHitFood(_this.snakeList[i], _this.snakeFood);
                    if (eatenFood != null) {
                        // console.log('eat!');
                        // 吃糖豆
                        if (_this.snakeFood.snakeEatFood(_this.snakeList[i], eatenFood)) {
                            _this.snakeRes(_this.snakeList[i]);
                            // 发送得分字符串（蛇名+蛇分）
                            var message = gameclient.socketdata.SendXmlHelper.buildSnakeScoreXml(_this.snakeList[i].snakeName, _this.snakeList[i].score);
                            _this.sendXmlToServer(message);
                            continue;
                        }
                    }
                    // 蛇头与边框的碰撞检测
                    if (_this.snakeHitBorder(_this.snakeList[i])) {
                        // console.log('hit border!');
                        _this.snakeRes(_this.snakeList[i]);
                    }
                }
            }
            // 对蛇与蛇的碰撞检测
            // 蛇头碰撞
            for (var i = 0; i < _this.snakeList.length - 1; i++) {
                for (var j = i + 1; j < _this.snakeList.length; j++) {
                    if (_this.snakeList[i].snakeBodyList.length * _this.snakeList[j].snakeBodyList.length != 0) {
                        if (_this.headHitHead(_this.snakeList[i], _this.snakeList[j])) {
                            if (_this.snakeList[i].snakeBodyList.length > _this.snakeList[j].snakeBodyList.length) {
                                _this.snakeRes(_this.snakeList[j]);
                            }
                            else if (_this.snakeList[i].snakeBodyList.length < _this.snakeList[j].snakeBodyList.length) {
                                _this.snakeRes(_this.snakeList[i]);
                            }
                            else {
                                continue;
                            }
                        }
                    }
                }
            }
            // 蛇头碰蛇身
            for (var i = 0; i < _this.snakeList.length; i++) {
                if (_this.headHitBody(_this.snakeList[i])) {
                    _this.snakeRes(_this.snakeList[i]);
                }
            }
            return true;
        };
        _this.snakeFood = snakeFood;
        _this.snakeList = snakeList;
        _this.gameSocket = gameSocket;
        return _this;
    }
    // 蛇头与食物是否发生碰撞
    CollisionDetection.prototype.snakeHitFood = function (mySnake, myFood) {
        var mySnakeHead = new egret.Point();
        mySnakeHead.x = mySnake.snakeBodyList[0].x;
        mySnakeHead.y = mySnake.snakeBodyList[0].y;
        // 计算蛇头与食物的距离，蛇头半径为15
        for (var i = 0; i < myFood.foodList.length; i++) {
            var distance = Math.sqrt(Math.pow(mySnakeHead.x - myFood.foodList[i].sitePoint.x, 2) + Math.pow(mySnakeHead.y - myFood.foodList[i].sitePoint.y, 2));
            if (distance < 80 + mySnake.power) {
                return myFood.foodList[i];
            }
        }
        return null;
    };
    // 蛇头与舞台边框是否发生碰撞，发生碰撞返回true
    CollisionDetection.prototype.snakeHitBorder = function (mySnake) {
        var mySnakeHead = new egret.Point();
        mySnakeHead.x = mySnake.snakeBodyList[0].x;
        mySnakeHead.y = mySnake.snakeBodyList[0].y;
        if (mySnakeHead.x < 10 || mySnakeHead.x > 990 || mySnakeHead.y < 10 || mySnakeHead.y > 990) {
            // console.log("hit !");
            return true;
        }
        return false;
    };
    // 食物与舞台边框是否发生碰撞，发生碰撞返回true
    CollisionDetection.prototype.foodHitBorder = function (myFood) {
        var tempx = myFood.food.x;
        var tempy = myFood.food.y;
        if (tempx < 10 || tempx > 990 || tempy < 10 || tempy > 990)
            return true;
        return false;
    };
    // 蛇头与蛇头相撞
    CollisionDetection.prototype.headHitHead = function (mySnake, anSnake) {
        var offX = mySnake.snakeBodyList[0].x - anSnake.snakeBodyList[0].x;
        var offY = mySnake.snakeBodyList[0].y - anSnake.snakeBodyList[0].y;
        var distance = Math.sqrt(Math.pow(offX, 2) + Math.pow(offY, 2));
        if (distance < 20) {
            return true;
        }
        return false;
    };
    // 蛇头与蛇身相撞，第二节蛇身与蛇头相距太近，有点小问题
    // 如果蛇头的中心点与其他蛇身体的中心点之间的距离==（蛇头宽度+碰撞蛇身体宽度）/2就会死亡
    CollisionDetection.prototype.headHitBody = function (mySnake) {
        for (var j = 0; j < this.snakeList.length; j++) {
            if (mySnake != this.snakeList[j] && mySnake.snakeBodyList.length * this.snakeList[j].snakeBodyList.length != 0) {
                for (var i = 1; i < this.snakeList[j].snakeBodyList.length; i++) {
                    var offX = mySnake.snakeBodyList[0].x - this.snakeList[j].snakeBodyList[i].x;
                    var offY = mySnake.snakeBodyList[0].y - this.snakeList[j].snakeBodyList[i].y;
                    var distance = Math.sqrt(Math.pow(offX, 2) + Math.pow(offY, 2));
                    if (distance < 20) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    CollisionDetection.prototype.snakeRes = function (mySnake) {
        var tempPointList = [];
        for (var j = 0; j < mySnake.snakeBodyList.length; j++) {
            // 获取死亡位置
            var snakeBodyPoint = new egret.Point();
            snakeBodyPoint.x = mySnake.snakeBodyList[j].x;
            snakeBodyPoint.y = mySnake.snakeBodyList[j].y;
            tempPointList.push(snakeBodyPoint);
            mySnake.removeChild(mySnake.snakeBodyList[j]);
        }
        // 删除原身体，重新创建，恢复初始速度
        mySnake.speed = 5;
        mySnake.isSpeedUp = false;
        mySnake.power = 0;
        mySnake.removeChild(mySnake.snakeInfo);
        mySnake.snakeBodyList = [];
        for (var j = 0; j < tempPointList.length; j++) {
            // 在蛇死亡的地方生成糖豆
            this.snakeFood.snakeDeathFood(tempPointList[j]);
        }
        // 一秒之后在其他地方生成一条新蛇
        egret.setTimeout(function () {
            mySnake.createNewSnake();
        }, this, 1000);
    };
    //发送数据到服务器端
    CollisionDetection.prototype.sendXmlToServer = function (xmlStr) {
        //websocket
        // let gameSocket = this.gameSocket;
        if (this.gameSocket != null && this.gameSocket.connected == true) {
            // this.gameSocket.writeUTFBytes(xmlStr + "\n");
            this.gameSocket.writeUTF(xmlStr + "\n");
            this.gameSocket.flush(); //对套接字输出缓冲区中积累的所有数据进行刷新
            console.log("send!");
        }
        else {
            console.log("failed ");
        }
    };
    return CollisionDetection;
}(egret.DisplayObjectContainer));
__reflect(CollisionDetection.prototype, "CollisionDetection");
//# sourceMappingURL=CollisionDetection.js.map