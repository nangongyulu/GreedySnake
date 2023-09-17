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
 * 地图左下角(200, 780)创建一个摇杆，根据摇杆来控制蛇移动的方向，
 */
var gameclient;
(function (gameclient) {
    var control;
    (function (control) {
        var MyJoystick = (function (_super) {
            __extends(MyJoystick, _super);
            function MyJoystick(gameSocket) {
                var _this = _super.call(this) || this;
                _this.isStatus = false;
                _this.touchPoint = new egret.Point();
                _this.moveAngle = 0; // 传入Snake类，配合速度进行移动
                _this.gameSocket = gameSocket;
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
                return _this;
            }
            MyJoystick.prototype.init = function () {
                var joystickBg = this.joystickBg;
                if (joystickBg == null) {
                    joystickBg = new egret.Shape();
                    this.joystickBg = joystickBg;
                }
                var joystick = this.joystick;
                if (joystick == null) {
                    joystick = new egret.Shape();
                    this.joystick = joystick;
                }
                // 摇杆底座
                joystickBg.graphics.beginFill(0xccffff, 0.4);
                joystickBg.graphics.drawCircle(0, 0, 100);
                joystickBg.graphics.endFill();
                joystickBg.x = 200;
                joystickBg.y = 780;
                this.addChild(joystickBg);
                // // 摇杆按钮
                // joystick.graphics.beginFill(0x00ff00, 0.4);
                // joystick.graphics.drawCircle(170, 750, 30);
                // joystick.graphics.endFill();
                // // 将锚点设置为半径的负值，则锚点位于圆心
                // joystick.anchorOffsetX = -30;
                // joystick.anchorOffsetY = -30;
                // this.addChild(joystick);
                // 摇杆按钮，不更改锚点
                joystick.graphics.beginFill(0x00ff00, 0.4);
                joystick.graphics.drawCircle(0, 0, 30);
                joystick.graphics.endFill();
                joystick.x = 200;
                joystick.y = 780;
                this.addChild(joystick);
                this.joystickPoint = new egret.Point(200, 700);
                this.joystickBgPoint = new egret.Point(200, 780);
                joystick.touchEnabled = true;
                this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onJoystick, this);
                this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveJoystick, this);
                this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.removeJoystick, this);
                // 加速按钮
                var buttonBg = new egret.Shape();
                buttonBg.graphics.beginFill(0xff6666, 0.4);
                buttonBg.graphics.drawCircle(780, 780, 70); // 780
                buttonBg.graphics.endFill();
                this.addChild(buttonBg);
                // // 点击加速
                // buttonBg.touchEnabled = true;
                // buttonBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.speedUp, this);
            };
            // 获取触摸点坐标，同时进入拖拽状态
            MyJoystick.prototype.onJoystick = function (e) {
                this.isStatus = true;
                this.touchPoint.x = e.stageX;
                this.touchPoint.y = e.stageY;
            };
            // 拖拽
            MyJoystick.prototype.moveJoystick = function (e) {
                if (this.isStatus) {
                    // 计算触摸点离摇杆底座中心的位置
                    var offsetX = e.stageX - this.touchPoint.x;
                    var offsetY = e.stageY - this.touchPoint.y;
                    var distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
                    this.moveAngle = Math.atan2(offsetY, offsetX);
                    var xml = gameclient.socketdata.SendXmlHelper.buildSnakeMoveXml(this.moveAngle);
                    this.sendXmlToServer(xml);
                    // // 弧度
                    // let moveRad = Math.atan2(offsetY, offsetX);
                    // // 转化为角度
                    // this.moveAngle = moveRad * 180 / Math.PI;
                    // console.log("Joystick.moveAngle:", this.moveAngle);
                    if (distance < 100) {
                        this.joystick.x = this.joystickBg.x + offsetX;
                        this.joystick.y = this.joystickBg.y + offsetY;
                    }
                    else {
                        var ratio = 100 / distance;
                        this.joystick.x = this.joystickBg.x + offsetX * ratio;
                        this.joystick.y = this.joystickBg.y + offsetY * ratio;
                        // this.joystick.x = this.joystickBg.x + 100 * Math.cos(moveRad);
                        // this.joystick.y = this.joystickBg.y + 100 * Math.sin(moveRad);
                    }
                }
            };
            MyJoystick.prototype.removeJoystick = function () {
                // 回归原点
                this.isStatus = false;
                this.joystick.x = this.joystickBg.x;
                this.joystick.y = this.joystickBg.y;
            };
            // 传输角度
            MyJoystick.prototype.sendXmlToServer = function (xmlStr) {
                //websocket
                if (this.gameSocket != null && this.gameSocket.connected == true) {
                    // this.gameSocket.writeUTFBytes(xmlStr + "\n");
                    this.gameSocket.writeUTF(xmlStr + "\n");
                    this.gameSocket.flush(); //对套接字输出缓冲区中积累的所有数据进行刷新
                }
                // console.log(this.gameSocket.connected);
            };
            return MyJoystick;
        }(egret.DisplayObjectContainer));
        control.MyJoystick = MyJoystick;
        __reflect(MyJoystick.prototype, "gameclient.control.MyJoystick");
    })(control = gameclient.control || (gameclient.control = {}));
})(gameclient || (gameclient = {}));
//# sourceMappingURL=Joystick.js.map