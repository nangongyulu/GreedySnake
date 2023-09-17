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
        var Gamelogic = (function (_super) {
            __extends(Gamelogic, _super);
            function Gamelogic() {
                var _this = _super.call(this) || this;
                _this.gameSocket = null;
                // private instance: Gamelogic;
                _this.stringBuffer = ""; //数据缓冲区
                _this.startUI = null;
                _this.loginUI = null;
                _this.registerUI = null;
                var startUI = new gameclient.ui.StartUI();
                _this.addChild(startUI);
                _this.startUI = startUI;
                startUI.addStartButtonEventListener(egret.TouchEvent.TOUCH_TAP, _this.login, _this);
                startUI.addConnectEventListener(egret.TouchEvent.TOUCH_TAP, _this.clickConnectBtn, _this);
                return _this;
            }
            Gamelogic.prototype.login = function () {
                var loginUI = this.loginUI;
                if (loginUI == null) {
                    loginUI = new gameclient.ui.LoginUI();
                }
                if (this.stage.contains(this.startUI)) {
                    this.removeChild(this.startUI);
                    this.startUI = null;
                }
                this.addChild(loginUI);
                loginUI.addLoginButtonEventListener(egret.TouchEvent.TOUCH_TAP, this.clickLoginBtn, this);
                loginUI.addRegisterButtonEventListener(egret.TouchEvent.TOUCH_TAP, this.register, this);
                this.loginUI = loginUI;
            };
            Gamelogic.prototype.register = function () {
                var registerUI = new gameclient.ui.RegisterUI(this.gameSocket);
                this.removeChild(this.loginUI);
                this.loginUI = null;
                this.addChild(registerUI);
                this.registerUI = registerUI;
                registerUI.addBackforwardEventListener(egret.TouchEvent.TOUCH_TAP, this.backToLogin, this);
            };
            Gamelogic.prototype.backToLogin = function () {
                console.log(this.stage.contains(this.loginUI));
                this.removeChild(this.registerUI);
                this.login();
            };
            // 连接服务器
            Gamelogic.prototype.clickConnectBtn = function (event) {
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
            };
            Gamelogic.prototype.clickLoginBtn = function (event) {
                // 将登录账号信息传入服务器
                var username = this.loginUI.userName;
                var password = this.loginUI.password;
                console.log(username, password);
                var sendXml = gameclient.socketdata.SendXmlHelper.buildUserLoginXml(username, password); //构造活跃信息xml
                this.sendXmlToServer(sendXml); //发送xml文档到服务器
                // console.log(this.gameSocket.connected);
            };
            // private clickLoginBtn2(event: egret.Event): void {
            //     let sendXml: string = socketdata.SendXmlHelper.buildUserLoginXml("testuser2","222222");//构造活跃信息xml
            //     this.sendXmlToServer(sendXml);//发送xml文档到服务器
            // }
            // 服务器发送过来的数据
            Gamelogic.prototype.webSocketDataHandler = function (event) {
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
            Gamelogic.prototype.gameDataHelper = function (xmlStr) {
                // egret.log(xmlStr);
                var tempList = gameclient.socketdata.XmlDataHelper.dateHelper(xmlStr); //解析数据,返回数据组数,如果该数组为null,表示不能解析成功
                if (tempList != null) {
                    if (tempList[0] == "LoginSuccess") {
                        this.checkSuccess(tempList[1]);
                    }
                }
            };
            /**
             * 释放Socket连接
             */
            Gamelogic.prototype.disposeGameSocket = function () {
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
            Gamelogic.prototype.closeHandler = function (event) {
                console.log("连接关闭");
            };
            //socket连接成功
            Gamelogic.prototype.connectHandler = function (event) {
                console.log("连接成功");
            };
            //连接失败
            Gamelogic.prototype.ioErrorHandler = function (event) {
                console.log("连接失败");
            };
            //发送数据到服务器端
            Gamelogic.prototype.sendXmlToServer = function (xmlStr) {
                //websocket
                var gameSocket = this.gameSocket;
                if (gameSocket != null && gameSocket.connected == true) {
                    // this.gameSocket.writeUTFBytes(xmlStr + "\n");
                    gameSocket.writeUTF(xmlStr + "\n");
                    gameSocket.flush(); //对套接字输出缓冲区中积累的所有数据进行刷新
                }
                // console.log(this.gameSocket.connected);
            };
            /**
             * 登录返回信息
             */
            Gamelogic.prototype.checkSuccess = function (success) {
                var _this = this;
                if (success == '0') {
                    var tx_1 = new egret.TextField();
                    this.addChild(tx_1);
                    tx_1.text = "登录失败";
                    tx_1.size = 40;
                    tx_1.textColor = 0x00ff00;
                    tx_1.verticalAlign = egret.VerticalAlign.MIDDLE;
                    tx_1.textAlign = egret.HorizontalAlign.CENTER;
                    tx_1.x = 250;
                    tx_1.y = 350;
                    tx_1.width = 500;
                    tx_1.height = 300;
                    tx_1.background = true;
                    tx_1.backgroundColor = 0xffff99;
                    tx_1.alpha = 0.7;
                    tx_1.touchEnabled = true;
                    // 点击即刻关闭
                    tx_1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.removeChild(tx_1); }, this);
                    egret.setTimeout(function () {
                        if (_this.stage.contains(tx_1)) {
                            _this.removeChild(tx_1);
                        }
                    }, this, 3000);
                }
                else {
                    this.removeChildren();
                    this.addChild(new gameclient.control.MyJoystick(this.gameSocket));
                }
            };
            return Gamelogic;
        }(egret.DisplayObjectContainer));
        engine.Gamelogic = Gamelogic;
        __reflect(Gamelogic.prototype, "gameclient.engine.Gamelogic");
    })(engine = gameclient.engine || (gameclient.engine = {}));
})(gameclient || (gameclient = {}));
//# sourceMappingURL=gamelogic.js.map