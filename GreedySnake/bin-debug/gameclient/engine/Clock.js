// 时分秒时钟
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
var Clock = (function (_super) {
    __extends(Clock, _super);
    function Clock(hour, min, sec) {
        var _this = _super.call(this) || this;
        _this.count = 0;
        _this.hour = hour;
        _this.min = min;
        _this.sec = sec;
        _this.init();
        return _this;
    }
    Clock.prototype.init = function () {
        this.timeText = new egret.TextField();
        this.doneTimer = new egret.Timer(500);
        this.doneTimer.addEventListener(egret.TimerEvent.TIMER, this.txShine, this);
        this.showClock(); // 第零秒的展示
        this.clockStatus = false;
        var loopTime = this.hour * 3600 + this.min * 60 + this.sec;
        this.countdownClock = new egret.Timer(1000, loopTime);
        this.countdownClock.addEventListener(egret.TimerEvent.TIMER, this.changeClock, this);
        this.addChild(this.timeText);
        this.countdownClock.start();
    };
    Clock.prototype.changeClock = function () {
        // 倒计时
        if (this.sec == 0) {
            if (this.min == 0) {
                if (this.hour == 0) {
                    // 计时完成，若在这里进行判断，则需要多执行一次，即结束时间被迫延长一秒
                    return;
                }
                else {
                    // 向小时借位
                    this.sec = 59;
                    this.min = 59;
                    this.hour -= 1;
                }
            }
            else {
                // 向分钟借位
                this.sec = 59;
                this.min -= 1;
            }
        }
        else {
            this.sec -= 1;
        }
        if (this.sec == 0 && this.min == 0 && this.hour == 0) {
            this.offClock();
        }
        // console.log('timer tick', this.timeText.text);
        // 展示时钟
        this.showClock();
    };
    Clock.prototype.showClock = function () {
        this.timeText.text = '';
        this.timeText.text += (this.hour < 10 ? '0' : '') + this.hour + " : " + (this.min < 10 ? '0' : '') + this.min + " : " + (this.sec < 10 ? "0" : "") + this.sec;
        // 设置时钟文本位置
        this.timeText.x = 300;
        this.timeText.y = 50;
        this.timeText.size = 50;
        this.timeText.width = 400;
        this.timeText.height = 200;
        this.timeText.textAlign = egret.HorizontalAlign.CENTER;
        this.timeText.textColor = 0xff00ff;
        this.timeText.alpha = 0.7;
        if (this.hour == 0 && this.min == 0 && this.sec < 11) {
            this.doneTimer.start();
        }
    };
    Clock.prototype.txShine = function () {
        if (this.count % 2 == 0) {
            this.timeText.textColor = 0xffffff;
        }
        else {
            this.timeText.textColor = 0xff00ff;
        }
        this.count += 1;
    };
    Clock.prototype.offClock = function () {
        this.clockStatus = true;
        this.countdownClock.stop();
        this.doneTimer.stop();
        // 移除监听
        this.countdownClock.removeEventListener(egret.TimerEvent.TIMER, this.showClock, this);
        this.doneTimer.removeEventListener(egret.TimerEvent.TIMER, this.txShine, this);
    };
    return Clock;
}(egret.DisplayObjectContainer));
__reflect(Clock.prototype, "Clock");
//# sourceMappingURL=Clock.js.map