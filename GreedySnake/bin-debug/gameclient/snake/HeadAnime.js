//armatureName = "MovieClip”,animationName = "newAnimation"
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
var LiRuoLingXiao = (function (_super) {
    __extends(LiRuoLingXiao, _super);
    function LiRuoLingXiao() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    LiRuoLingXiao.prototype.init = function () {
        // 加载龙骨资源
        var dragonBonesData = RES.getRes("liruolingxiao_dbbin");
        var textureData = RES.getRes("liruolingxiao_json");
        var texture = RES.getRes("liruolingxiao_png");
        // 动画工厂
        var factory = new dragonBones.EgretFactory();
        // 解析并添加龙骨数据
        factory.parseDragonBonesData(dragonBonesData);
        factory.parseTextureAtlasData(textureData, texture);
        // 位置与大小
        var dragonBonesMC = factory.buildArmatureDisplay("MovieClip");
        dragonBonesMC.x = 0;
        dragonBonesMC.y = 0;
        dragonBonesMC.scaleX = 0.5;
        dragonBonesMC.scaleY = 0.5;
        this.dragonBonesMC = dragonBonesMC;
        this.addChild(dragonBonesMC);
        // // 添加背景音乐
        // let sound: egret.Sound = new egret.Sound();
        // sound = RES.getRes("sound_mp3");
        // this.sound = sound;
        // let channel:egret.SoundChannel = this.soundChannel;
        // 开始结束运行逻辑，运行逻辑
        dragonBonesMC.animation.play("1");
        // channel = sound.play(); // 默认循环播放
        dragonBonesMC.addEventListener(dragonBones.MovieEvent.COMPLETE, this.onAnimationComplete, this);
        // // 按钮控制重新开始
        // let buttonagain: eui.Button = new eui.Button();
        // buttonagain.x = this.stage.height/2;
        // buttonagain.y = this.stage.width/2;
        // buttonagain.label = "播放动画";
        // buttonagain.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
        //     this.dragonBonesMC.animation.play("1", 1);
        //     sound.play();
        // }, this);
        // this.addChild(buttonagain);
    };
    // 播放完的动画
    LiRuoLingXiao.prototype.onAnimationComplete = function (event) {
        var dragonBonesMC = this.dragonBonesMC;
        // this.soundChannel.stop();
        dragonBonesMC.animation.gotoAndStopByFrame("1", dragonBonesMC.animation.animations[1].frameCount);
    };
    return LiRuoLingXiao;
}(egret.DisplayObjectContainer));
__reflect(LiRuoLingXiao.prototype, "LiRuoLingXiao");
//# sourceMappingURL=HeadAnime.js.map