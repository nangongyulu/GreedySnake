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
 * AI蛇移动路线
 */
var SnakeMoveAngle = (function (_super) {
    __extends(SnakeMoveAngle, _super);
    function SnakeMoveAngle() {
        var _this = _super.call(this) || this;
        _this.angle();
        return _this;
    }
    SnakeMoveAngle.prototype.angle = function () {
        return;
    };
    return SnakeMoveAngle;
}(egret.DisplayObjectContainer));
__reflect(SnakeMoveAngle.prototype, "SnakeMoveAngle");
//# sourceMappingURL=MoveAngle.js.map