
//armatureName = "MovieClip”,animationName = "newAnimation"

class LiRuoLingXiao extends egret.DisplayObjectContainer{
    private dragonBonesMC: dragonBones.EgretArmatureDisplay;
    private sound: egret.Sound;
    private soundChannel:egret.SoundChannel; // 用于控制音频暂停
    constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
    }
    private init(): void {
       
        // 加载龙骨资源
        let dragonBonesData = RES.getRes("liruolingxiao_dbbin");
        let textureData = RES.getRes("liruolingxiao_json");
        let texture = RES.getRes("liruolingxiao_png");
        
        // 动画工厂
        let factory = new dragonBones.EgretFactory();

        // 解析并添加龙骨数据
        factory.parseDragonBonesData(dragonBonesData);
        factory.parseTextureAtlasData(textureData, texture);

        // 位置与大小
        let dragonBonesMC: dragonBones.EgretArmatureDisplay = factory.buildArmatureDisplay("MovieClip");
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
        

}
    // 播放完的动画
    private onAnimationComplete(event: dragonBones.AnimationEvent) {
        let dragonBonesMC = this.dragonBonesMC;
        // this.soundChannel.stop();
        dragonBonesMC.animation.gotoAndStopByFrame("1", dragonBonesMC.animation.animations[1].frameCount); 
    }
}