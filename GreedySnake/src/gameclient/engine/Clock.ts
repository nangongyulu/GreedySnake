
// 时分秒时钟


class Clock extends egret.DisplayObjectContainer{
    // 参数
    private hour :number;
    private min :number;
    private sec:number;
    constructor(hour:number, min:number, sec:number){
        super();
        this.hour = hour;
        this.min = min;
        this.sec = sec;
        this.init();
    }

    // 时钟圆心位置
    // private finalX = this.stage.stageWidth / 2;
    // private finalY = this.stage.stageHeight / 2;

    // 数字时钟文本
    private timeText :egret.TextField;
    // 计时器  
    private countdownClock : egret.Timer;
    private isStop : boolean; // 倒计时是否暂停
    public clockStatus: boolean; // 倒计时是否结束
    private doneTimer : egret.Timer;

    private init(){
        this.timeText = new egret.TextField();
        this.doneTimer = new egret.Timer(500);
        this.doneTimer.addEventListener(egret.TimerEvent.TIMER, this.txShine, this);
        this.showClock(); // 第零秒的展示
        this.clockStatus = false;
        let loopTime:number = this.hour * 3600 + this.min * 60 + this.sec;
        this.countdownClock = new egret.Timer(1000, loopTime);
        this.countdownClock.addEventListener(egret.TimerEvent.TIMER, this.changeClock, this);
        this.addChild(this.timeText);
        this.countdownClock.start();
    }
    private changeClock(){
        // 倒计时
        if(this.sec == 0)
        {
            if(this.min == 0)
            {
                if (this.hour == 0){
                    // 计时完成，若在这里进行判断，则需要多执行一次，即结束时间被迫延长一秒
                    return ;
                }
                else{
                    // 向小时借位
                    this.sec = 59;
                    this.min = 59;
                    this.hour -= 1;
                }
            }
            else{
                // 向分钟借位
                this.sec = 59;
                this.min -= 1;
            }
        }
        else{
            this.sec -= 1;
        }

        if (this.sec == 0 && this.min == 0 && this.hour == 0){
            this.offClock();
        }
        // console.log('timer tick', this.timeText.text);
        // 展示时钟
        this.showClock();
    }
    private showClock(){
        this.timeText.text = '';
        this.timeText.text +=(this.hour < 10 ? '0':'') + this.hour + " : " + (this.min < 10 ? '0':'') + this.min + " : " + (this.sec < 10 ? "0" : "") + this.sec;
        // 设置时钟文本位置
        this.timeText.x = 300;
        this.timeText.y = 50;
        this.timeText.size = 50;
        this.timeText.width = 400;
        this.timeText.height = 200;
        this.timeText.textAlign = egret.HorizontalAlign.CENTER;
        this.timeText.textColor = 0xff00ff;
        this.timeText.alpha = 0.7;
        if(this.hour == 0 && this.min == 0 && this.sec < 11){ // 最后十秒
            this.doneTimer.start();
        }   
    }
    private count = 0;
    private txShine(){
        if(this.count % 2 == 0){
            this.timeText.textColor = 0xffffff;
        }
        else{
            this.timeText.textColor = 0xff00ff;
        }
        this.count += 1;
    }
    private offClock(){
        this.clockStatus = true;
        this.countdownClock.stop();
        this.doneTimer.stop();
        // 移除监听
        this.countdownClock.removeEventListener(egret.TimerEvent.TIMER, this.showClock, this);
        this.doneTimer.removeEventListener(egret.TimerEvent.TIMER, this.txShine, this);
    }
}