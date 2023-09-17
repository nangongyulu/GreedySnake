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
        var LoginUI = (function (_super) {
            __extends(LoginUI, _super);
            function LoginUI() {
                var _this = _super.call(this) || this;
                // 登录按钮
                var bt = new eui.Button();
                _this.loginButton = bt;
                bt.label = '登录';
                bt.horizontalCenter = 0;
                bt.verticalCenter = 0;
                bt.x = 270;
                bt.y = 650;
                bt.width = 460;
                bt.height = 100;
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
                return _this;
            }
            LoginUI.prototype.init = function () {
                var bgMain = new egret.Bitmap(RES.getRes("bg_jpg"));
                // 主页面背景
                bgMain.width = this.stage.stageWidth;
                bgMain.height = this.stage.stageHeight;
                this.addChild(bgMain);
                // 主页面文字
                var txMain = new egret.TextField();
                txMain.text = "点击任意地方开始游戏";
                txMain.size = 60;
                txMain.width = 800;
                txMain.height = 200;
                txMain.textColor = 0xff00ff;
                txMain.x = 100;
                txMain.y = 600;
                txMain.anchorOffsetX = -20;
                txMain.anchorOffsetY = -40;
                txMain.textAlign = egret.HorizontalAlign.CENTER;
                txMain.verticalAlign = egret.VerticalAlign.MIDDLE;
                // 文本简易闪烁效果
                egret.Tween.get(txMain, { loop: true })
                    .to({ alpha: 0.8, scaleX: 0.95, scaleY: 0.95 }, 1000).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 1000);
                this.addChild(txMain);
                bgMain.touchEnabled = true;
                bgMain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.LoginScene, this);
            };
            LoginUI.prototype.LoginScene = function () {
                this.removeChildren();
                var userName = new egret.TextField();
                var password = new egret.TextField();
                // 登录背景
                var bg = new egret.Bitmap(RES.getRes('bg_black_jpg'));
                bg.width = this.stage.stageWidth;
                bg.height = this.stage.stageHeight;
                bg.alpha = 0.5;
                this.addChild(bg);
                // 登录窗口
                // 用户名
                var userPic = new egret.Bitmap(RES.getRes("bg_user_png"));
                userPic.x = 280;
                userPic.y = 400;
                userPic.height = 50;
                userPic.width = 40;
                this.addChild(userPic);
                userName.x = 330;
                userName.y = 400;
                userName.width = 380;
                userName.height = 50;
                userName.size = 30;
                userName.verticalAlign = egret.VerticalAlign.MIDDLE;
                userName.type = egret.TextFieldType.INPUT;
                userName.inputType = egret.TextFieldInputType.TEXT;
                userName.border = true;
                userName.borderColor = 0x3333ff;
                console.log(userName.text);
                this.addChild(userName);
                // 密码
                var passPic = new egret.Bitmap(RES.getRes("bg_lock_png"));
                passPic.x = 280;
                passPic.y = 500;
                passPic.width = 40;
                passPic.height = 50;
                this.addChild(passPic);
                password.x = 330;
                password.y = 500;
                password.width = 380;
                password.height = 50;
                password.size = 30;
                password.verticalAlign = egret.VerticalAlign.MIDDLE;
                password.type = egret.TextFieldType.INPUT;
                password.inputType = egret.TextFieldInputType.PASSWORD;
                password.border = true;
                password.borderColor = 0x3333ff;
                this.addChild(password);
                this.addChild(this.loginButton);
                /**
                 * 修改按钮文本以及边框，并且要先添加到舞台
                 */
                this.loginButton.labelDisplay.size = 50;
                this.loginButton.labelDisplay.textColor = 0xffffff;
                this.loginButton.labelDisplay.textAlign = egret.HorizontalAlign.CENTER;
                this.loginButton.labelDisplay.verticalCenter = egret.VerticalAlign.MIDDLE;
                this.userName = userName.text;
                this.password = password.text;
            };
            LoginUI.prototype.addConnectEventListener = function (eventName, eventFun, eventObject) {
                this.loginButton.addEventListener(eventName, eventFun, eventObject);
            };
            LoginUI.prototype.addLoginButtonEventListener = function (eventName, eventFun, eventObject) {
                this.loginButton.addEventListener(eventName, eventFun, eventObject);
            };
            LoginUI.prototype.addRegisterButtonEventListener = function (eventName, eventFun, eventObject) {
                this.registerButton.addEventListener(eventName, eventFun, eventObject);
            };
            return LoginUI;
        }(egret.DisplayObjectContainer));
        engine.LoginUI = LoginUI;
        __reflect(LoginUI.prototype, "gameclient.engine.LoginUI");
    })(engine = gameclient.engine || (gameclient.engine = {}));
})(gameclient || (gameclient = {}));
//# sourceMappingURL=LoginUI.js.map