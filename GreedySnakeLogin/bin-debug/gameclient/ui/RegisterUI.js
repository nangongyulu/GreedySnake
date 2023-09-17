/**
 * 注册信息的传递
 * 用户名的实时查重
 * 注册界面与登录界面的切换
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
var gameclient;
(function (gameclient) {
    var ui;
    (function (ui) {
        var RegisterUI = (function (_super) {
            __extends(RegisterUI, _super);
            function RegisterUI(gameSocket) {
                var _this = _super.call(this) || this;
                _this.stringBuffer = ""; //数据缓冲区
                _this.isRegister = false;
                _this.isUsernameChecked = false;
                _this.isPasswordChecked = false;
                _this.gameSocket = gameSocket;
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.registerScene, _this);
                return _this;
            }
            RegisterUI.prototype.getRegisterButton = function () {
                if (!RegisterUI.registerButton) {
                    RegisterUI.registerButton = new eui.Button();
                }
                return RegisterUI.registerButton;
            };
            RegisterUI.prototype.registerScene = function () {
                var userName = new egret.TextField();
                var password = new egret.TextField();
                var nickName = new egret.TextField();
                var passwordValidate = new egret.TextField();
                var backforward = new egret.TextField();
                this.backforward = backforward;
                backforward.text = "< 返回";
                backforward.x = 50;
                backforward.y = 50;
                backforward.width = 200;
                backforward.height = 70;
                backforward.size = 50;
                backforward.textColor = 0xffffff;
                backforward.touchEnabled = true;
                this.addChild(backforward);
                // 登录背景
                var bg = new egret.Bitmap(RES.getRes('bg_black_jpg'));
                bg.width = this.stage.stageWidth;
                bg.height = this.stage.stageHeight;
                bg.alpha = 0.5;
                this.addChild(bg);
                // 登录窗口
                // 昵称
                var tx1 = new egret.TextField();
                tx1.text = "请输入您的昵称：";
                tx1.x = 300;
                tx1.y = 210;
                tx1.width = 380;
                tx1.height = 50;
                tx1.size = 30;
                tx1.textColor = 0x000000;
                this.addChild(tx1);
                nickName.x = 300;
                nickName.y = 250;
                nickName.width = 380;
                nickName.height = 50;
                nickName.size = 30;
                nickName.verticalAlign = egret.VerticalAlign.MIDDLE;
                nickName.type = egret.TextFieldType.INPUT;
                nickName.inputType = egret.TextFieldInputType.TEXT;
                nickName.border = true;
                nickName.borderColor = 0x3333ff;
                this.addChild(nickName);
                this.nickNameInput = nickName;
                nickName.addEventListener(egret.Event.CHANGE, this.checkNickName, this);
                // 用户名
                var tx2 = new egret.TextField();
                tx2.text = "请输入您的用户名：";
                tx2.x = 300;
                tx2.y = 310;
                tx2.width = 380;
                tx2.height = 50;
                tx2.size = 30;
                tx2.textColor = 0x000000;
                this.addChild(tx2);
                userName.x = 300;
                userName.y = 350;
                userName.width = 380;
                userName.height = 50;
                userName.size = 30;
                userName.verticalAlign = egret.VerticalAlign.MIDDLE;
                userName.type = egret.TextFieldType.INPUT;
                userName.inputType = egret.TextFieldInputType.TEXT;
                userName.border = true;
                userName.borderColor = 0x3333ff;
                this.addChild(userName);
                this.userNameInput = userName;
                userName.addEventListener(egret.Event.CHANGE, this.checkUserName, this);
                // 密码
                var tx3 = new egret.TextField();
                tx3.text = "请输入您的密码：";
                tx3.x = 300;
                tx3.y = 410;
                tx3.width = 380;
                tx3.height = 50;
                tx3.size = 30;
                tx3.textColor = 0x000000;
                this.addChild(tx3);
                password.x = 300;
                password.y = 450;
                password.width = 380;
                password.height = 50;
                password.size = 30;
                password.textColor = 0x00ff00;
                password.verticalAlign = egret.VerticalAlign.MIDDLE;
                password.type = egret.TextFieldType.INPUT;
                password.inputType = egret.TextFieldInputType.PASSWORD;
                password.border = true;
                password.borderColor = 0x3333ff;
                this.addChild(password);
                this.passwordInput = password;
                password.addEventListener(egret.Event.CHANGE, this.checkPassword, this);
                // 确认密码
                var tx4 = new egret.TextField();
                tx4.text = "请确认您的密码：";
                tx4.x = 300;
                tx4.y = 510;
                tx4.width = 380;
                tx4.height = 50;
                tx4.size = 30;
                tx4.textColor = 0x000000;
                this.addChild(tx4);
                passwordValidate.x = 300;
                passwordValidate.y = 550;
                passwordValidate.width = 380;
                passwordValidate.height = 50;
                passwordValidate.size = 30;
                passwordValidate.verticalAlign = egret.VerticalAlign.MIDDLE;
                passwordValidate.type = egret.TextFieldType.INPUT;
                passwordValidate.inputType = egret.TextFieldInputType.PASSWORD;
                passwordValidate.border = true;
                passwordValidate.borderColor = 0x3333ff;
                this.addChild(passwordValidate);
                this.passwordInputValidate = passwordValidate;
                passwordValidate.addEventListener(egret.Event.CHANGE, this.checkPasswordValidate, this);
                var bt = new eui.Button();
                RegisterUI.registerButton = bt;
                bt.label = '注册';
                bt.horizontalCenter = 0;
                bt.verticalCenter = 0;
                bt.x = 270;
                bt.y = 650;
                bt.width = 430;
                bt.height = 100;
                this.addChild(RegisterUI.registerButton);
                /**
                 * 修改按钮文本以及边框，并且要先添加到舞台
                 */
                RegisterUI.registerButton.labelDisplay.size = 50;
                RegisterUI.registerButton.labelDisplay.textColor = 0xffffff;
                RegisterUI.registerButton.labelDisplay.textAlign = egret.HorizontalAlign.CENTER;
                RegisterUI.registerButton.labelDisplay.verticalCenter = egret.VerticalAlign.MIDDLE;
            };
            RegisterUI.prototype.checkNickName = function () {
                this.nickName = this.nickNameInput.text;
            };
            RegisterUI.prototype.checkUserName = function () {
                var userName = this.userNameInput.text;
                this.userName = userName;
                var userNameMessage = gameclient.socketdata.SendXmlHelper.buildUserNameXml(userName);
                this.sendXmlToServer(userName);
                // 通过socket发送至服务器，然后判断是否存在
                if (this.isUsernameChecked) {
                    this.userNameInput.textColor = 0x00ff00;
                }
                else {
                    this.userNameInput.textColor = 0xff0000;
                }
                // 确保用户名可用以及两次输入密码匹配，随后才可以进行注册
                if (this.isUsernameChecked && this.isPasswordChecked) {
                    this.isRegister = true;
                }
                else {
                    this.isRegister = false;
                }
            };
            RegisterUI.prototype.isUserNameOK = function (success) {
                if (success == '1') {
                    return true;
                }
                return false;
            };
            RegisterUI.prototype.checkPassword = function () {
                var password = this.passwordInput.text;
                this.password = password;
                var passwordValidate = this.passwordInputValidate.text;
                if (password != passwordValidate) {
                    this.isPasswordChecked = false;
                    this.passwordInputValidate.textColor = 0xff0000;
                }
                else {
                    this.isPasswordChecked = true;
                    this.passwordInputValidate.textColor = 0x00ff00;
                }
                // 可设置密码格式
            };
            RegisterUI.prototype.checkPasswordValidate = function () {
                // 验证密码的再次输入是否匹配
                var password = this.password;
                var passwordValidate = this.passwordInputValidate.text;
                if (password != passwordValidate) {
                    this.isPasswordChecked = false;
                    this.passwordInputValidate.textColor = 0xff0000;
                }
                else {
                    this.isPasswordChecked = true;
                    this.passwordInputValidate.textColor = 0x00ff00;
                }
                // 确保用户名可用以及两次输入密码匹配，随后才可以进行注册
                if (this.isUsernameChecked && this.isPasswordChecked) {
                    this.isRegister = true;
                }
                else {
                    this.isRegister = false;
                }
                if (!this.isRegister) {
                    if (!RegisterUI.registerButton.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                        RegisterUI.registerButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.registerFailed, this);
                    }
                }
                else {
                    RegisterUI.registerButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.registerCheck, this);
                }
            };
            RegisterUI.prototype.registerCheck = function () {
                // 移除监听  
                // if(this.nickNameInput.hasEventListener(egret.Event.CHANGE)){
                //     this.nickNameInput.removeEventListener(egret.Event.CHANGE, this.checkNickName, this);
                // }
                // if(this.userNameInput.hasEventListener(egret.Event.CHANGE)){
                //     this.userNameInput.removeEventListener(egret.Event.CHANGE, this.checkUserName, this);
                // }
                // if(this.passwordInput.hasEventListener(egret.Event.CHANGE)){
                //     this.passwordInput.removeEventListener(egret.Event.CHANGE, this.checkPassword, this);
                // }
                // if(this.passwordInputValidate.hasEventListener(egret.Event.CHANGE)){
                //     this.passwordInputValidate.removeEventListener(egret.Event.CHANGE, this.checkPasswordValidate, this);
                // }
                // 将注册账号信息发送至服务器，随后存储在数据库中
                var nickName = this.nickName;
                var userName = this.userName;
                var password = this.password;
                var registerMessage = gameclient.socketdata.SendXmlHelper.buildUserRegisterXml(nickName, userName, password);
                this.parent.removeChild(this);
            };
            // 服务器发送过来的数据
            RegisterUI.prototype.webSocketDataHandler = function (event) {
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
            RegisterUI.prototype.gameDataHelper = function (xmlStr) {
                // egret.log(xmlStr);
                var tempList = gameclient.socketdata.XmlDataHelper.dateHelper(xmlStr); //解析数据,返回数据组数,如果该数组为null,表示不能解析成功
                if (tempList != null) {
                    if (tempList[0] == "RegisterUserNameSuccess") {
                        this.isUsernameChecked = true;
                    }
                }
            };
            //发送数据到服务器端
            RegisterUI.prototype.sendXmlToServer = function (xmlStr) {
                if (this.gameSocket != null && this.gameSocket.connected == true) {
                    // this.gameSocket.writeUTFBytes(xmlStr + "\n");
                    this.gameSocket.writeUTF(xmlStr + "\n");
                    this.gameSocket.flush(); //对套接字输出缓冲区中积累的所有数据进行刷新
                }
                // console.log(this.gameSocket.connected);
            };
            RegisterUI.prototype.addBackforwardEventListener = function (eventName, eventFun, eventObject) {
                this.backforward.addEventListener(eventName, eventFun, eventObject);
            };
            // 无法注册时仍点击注册，按钮震动
            RegisterUI.prototype.registerFailed = function () {
                console.log(RegisterUI.registerButton);
                var offsetX = 10;
                var offsetY = 10;
                // 震动的持续时间
                var duration = 100;
                // 设置动画的属性和参数
                var tween = egret.Tween.get(RegisterUI.registerButton);
                tween.to({ x: RegisterUI.registerButton.x + offsetX, y: RegisterUI.registerButton.y + offsetY }, duration, egret.Ease.backInOut)
                    .to({ x: RegisterUI.registerButton.x - offsetX, y: RegisterUI.registerButton.y - offsetY }, duration, egret.Ease.backInOut)
                    .to({ x: RegisterUI.registerButton.x, y: RegisterUI.registerButton.y }, duration, egret.Ease.backInOut);
            };
            return RegisterUI;
        }(egret.DisplayObjectContainer));
        ui.RegisterUI = RegisterUI;
        __reflect(RegisterUI.prototype, "gameclient.ui.RegisterUI");
    })(ui = gameclient.ui || (gameclient.ui = {}));
})(gameclient || (gameclient = {}));
//# sourceMappingURL=RegisterUI.js.map