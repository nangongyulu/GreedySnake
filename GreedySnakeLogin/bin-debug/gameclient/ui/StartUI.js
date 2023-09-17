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
        var StartUI = (function (_super) {
            __extends(StartUI, _super);
            function StartUI() {
                var _this = _super.call(this) || this;
                // 开始按钮
                var bt = new eui.Button();
                _this.startButton = bt;
                bt.label = "开始";
                bt.x = 400;
                bt.y = 600;
                bt.width = 200;
                bt.height = 100;
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
                return _this;
            }
            StartUI.prototype.init = function () {
                var bgMain = new egret.Bitmap(RES.getRes("snake_bg_png"));
                // 主页面背景
                bgMain.width = this.stage.stageWidth;
                bgMain.height = this.stage.stageHeight;
                this.addChild(bgMain);
                this.addChild(this.startButton);
                this.startButton.labelDisplay.size = 50;
            };
            StartUI.prototype.addStartButtonEventListener = function (eventName, eventFun, eventObject) {
                this.startButton.addEventListener(eventName, eventFun, eventObject);
            };
            StartUI.prototype.addConnectEventListener = function (eventName, eventFun, eventObject) {
                this.startButton.addEventListener(eventName, eventFun, eventObject);
            };
            return StartUI;
        }(egret.DisplayObjectContainer));
        ui.StartUI = StartUI;
        __reflect(StartUI.prototype, "gameclient.ui.StartUI");
    })(ui = gameclient.ui || (gameclient.ui = {}));
})(gameclient || (gameclient = {}));
//# sourceMappingURL=StartUI.js.map