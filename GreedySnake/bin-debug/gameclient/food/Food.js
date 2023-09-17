/**
 * 产生各式各样的糖豆
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
var Food = (function (_super) {
    __extends(Food, _super);
    function Food(type, sitePoint) {
        var _this = _super.call(this) || this;
        _this.foodType = type;
        if (sitePoint == undefined) {
            sitePoint = _this.randomPoint();
        }
        _this.sitePoint = sitePoint;
        _this.createFood();
        return _this;
    }
    ;
    Food.prototype.createFood = function () {
        switch (this.foodType) {
            case (1):// 产生小糖豆，吃一个加一分
                this.food = this.createRoundFood(10);
                break;
            case (2):// 产生大糖豆，吃一个加五分
                this.food = this.createRoundFood(20);
                break;
            case (3):// 产生过期糖豆，吃一个扣一分
                var food3 = new egret.Shape();
                food3.x = this.sitePoint.x;
                food3.y = this.sitePoint.y;
                food3.graphics.beginFill(Math.random() * 0xffffff);
                food3.graphics.lineStyle(1, Math.random() * 0xffffff); // 随机色
                food3.graphics.moveTo(0, 0);
                food3.graphics.lineTo(-10, 18);
                food3.graphics.lineTo(10, 18);
                food3.graphics.lineTo(0, 0);
                food3.graphics.endFill();
                this.food = food3;
                break;
            case (4):// 产生炸弹，吃一个就寄啦
                var food4 = new egret.Shape();
                food4.x = this.sitePoint.x;
                food4.y = this.sitePoint.y;
                food4.graphics.beginFill(0x000000);
                food4.graphics.drawCircle(0, 0, 25);
                food4.graphics.endFill();
                food4.graphics.lineStyle(10, 0x000000);
                food4.graphics.moveTo(15, -15);
                food4.graphics.curveTo(25, -40, 30, -25);
                food4.graphics.endFill();
                egret.Tween.get(food4, { loop: true }).to({ scaleX: 0.9, scaleY: 0.9 }, 300).to({ scaleX: 1.1, scaleY: 1.1 }, 300).to({ scaleX: 1, scaleY: 1 }, 300);
                this.food = food4;
                break;
            case (5):// 产生磁铁，扩大吃的范围，给蛇加一个属性，在蛇食物碰撞检测的distance加上这个属性
                this.food = this.createMagnetFood(6);
                break;
            case (6):// 产生冰冻糖豆，吃一个减速/冰冻，吃冰啦=v=
                ;
            default:
                console.log('error foodtype'); // ばか，你都输入了些什么玩意！
                break;
        }
    };
    // 随机点生成, 舞台范围内的整型数据，避免糖豆生成到舞台之外
    Food.prototype.randomPoint = function () {
        var randomPoint = new egret.Point();
        randomPoint.x = Math.floor(Math.random() * 1000); // 向下取整
        randomPoint.y = Math.floor(Math.random() * 1000);
        return randomPoint;
    };
    // 产生半径为r的圆形糖豆
    Food.prototype.createRoundFood = function (r) {
        var food = new egret.Shape();
        food.graphics.beginFill(Math.random() * 0xffffff); // 随机色
        food.graphics.drawCircle(0, 0, r); // 随机点坐标
        food.graphics.endFill();
        food.x = this.sitePoint.x;
        food.y = this.sitePoint.y;
        return food;
    };
    // 生成磁铁
    Food.prototype.createMagnetFood = function (r) {
        var magnet = new egret.Shape();
        magnet.graphics.beginFill(0xff0000);
        magnet.graphics.moveTo(0, 0);
        magnet.graphics.lineTo(r, 0);
        magnet.graphics.lineTo(r, 2 * r);
        magnet.graphics.curveTo(r, 3 * r, 2 * r, 3 * r);
        magnet.graphics.lineTo(2 * r, 4 * r);
        magnet.graphics.curveTo(0, 4 * r, 0, 2 * r);
        magnet.graphics.lineTo(0, 0);
        magnet.graphics.endFill();
        magnet.graphics.beginFill(0x0000ff);
        magnet.graphics.moveTo(4 * r, 0);
        magnet.graphics.lineTo(3 * r, 0);
        magnet.graphics.lineTo(3 * r, 2 * r);
        magnet.graphics.curveTo(3 * r, 3 * r, 2 * r, 3 * r);
        magnet.graphics.lineTo(2 * r, 4 * r);
        magnet.graphics.curveTo(4 * r, 4 * r, 4 * r, 2 * r);
        magnet.graphics.lineTo(4 * r, 0);
        magnet.graphics.endFill();
        var r1 = r / 4;
        magnet.graphics.lineStyle(2, 0x000000);
        magnet.graphics.moveTo(r1, 3 * r1);
        magnet.graphics.lineTo(r1, r1);
        magnet.graphics.lineTo(3 * r1, 3 * r1);
        magnet.graphics.lineTo(3 * r1, r1);
        magnet.graphics.endFill();
        magnet.graphics.lineStyle(2, 0x000000);
        magnet.graphics.drawArc(r / 2 + 3 * r, r / 3, r / 6, Math.PI / 2, 0);
        magnet.graphics.drawArc(r / 2 + 3 * r, 2 * r / 3, r / 6, -Math.PI / 2, Math.PI);
        magnet.graphics.endFill();
        var angle = Math.PI / 9;
        var matrix = new egret.Matrix();
        matrix.translate(-magnet.anchorOffsetX, -magnet.anchorOffsetY);
        matrix.rotate(angle);
        magnet.matrix = matrix;
        magnet.x = this.sitePoint.x;
        magnet.y = this.sitePoint.y;
        return magnet;
    };
    return Food;
}(egret.Shape));
__reflect(Food.prototype, "Food");
//# sourceMappingURL=Food.js.map