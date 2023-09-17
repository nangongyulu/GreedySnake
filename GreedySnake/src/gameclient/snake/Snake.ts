/**
 * 蛇蛇诶
 */
class Snake extends egret.Sprite{
    // isJoyStick 是否通过摇杆操作，isButton是否添加加速，用于区分人机蛇与玩家
    constructor(isJoyStick: boolean, isButton: boolean, snakeName: string){
        super();
        this.isJoyStick = isJoyStick;
        this.isButton = isButton;
        this.snakeName = snakeName;
        this.init(isJoyStick, isButton);
    }
    
    private gameSocket: egret.WebSocket;

    private stringBuffer: string = "";//数据缓冲区

    private isButton : boolean; // 
    private isJoyStick : boolean; 
    public snakeName : string; // 蛇昵称，也是用户的昵称
    public snakeBodyList = []; // 蛇的全部节点
    public snakeInfo : egret.TextField;
    private snakeHead : LiRuoLingXiao; // 蛇头
    public moveAngle: number = 0;
    private myJoyStick : MyJoystick; // 调用摇杆类
    public isSpeedUp: boolean = false;
    public speed = 5; // 蛇的基础移速
    public score = 0; // 蛇的基础得分
    public power = 0; // 蛇吸取食物的范围
    
    private init(isJoyStick: boolean, isButton: boolean):void{

        this.createNewSnake();
        this.addEventListener(egret.Event.ENTER_FRAME, this.snakeMoveAngle, this);
    }
    // 创建初始蛇
    public createNewSnake(){
        // 龙骨动画创建蛇头
        this.snakeHead = new LiRuoLingXiao();
        this.snakeHead.x = Math.random() * 700 + 100;
        this.snakeHead.y = Math.random() * 700 + 100;
        // 设置子舞台的位置
        this.x = 0;
        this.y = 0;

        // 蛇名，一直在蛇头之上，限定宽度为十个字符
        let nameTx = new egret.TextField();
        this.snakeInfo = nameTx;
        nameTx.text = this.snakeName + '  ' + this.snakeBodyList.length;
        nameTx.x = this.snakeHead.x -50;
        nameTx.y = this.snakeHead.y -40;
        nameTx.width = 150;
        nameTx.height = 20;
        nameTx.size = 20;
        nameTx.verticalAlign = egret.VerticalAlign.MIDDLE;
        nameTx.textAlign = egret.HorizontalAlign.CENTER;
        nameTx.background = true;
        nameTx.backgroundColor = 0xff00ff;
        this.addChild(nameTx);

        // 添加至list
        this.snakeBodyList.push(this.snakeHead);
        this.addChild(this.snakeBodyList[this.snakeBodyList.length - 1]);
        // 指定蛇头索引为最大值
        this.setChildIndex(this.snakeBodyList[this.snakeBodyList.length - 1], -9999);
        
        // 蛇身初始长度为5
        for (let i = 0; i < 5; i++){
            this.snakeBody();
        }
    }
    public snakeBody(){ // 吃到食物后新增节点
        let snakeBody = new egret.Shape();
        snakeBody.graphics.beginFill(Math.random() * 0xffffff);
        snakeBody.graphics.drawCircle(0, 0, 15);
        snakeBody.graphics.endFill();

        // 指定新增节点的位置在列表的最后一个节点,也就是蛇尾节点的位置小距离偏移
        snakeBody.x = this.snakeBodyList[this.snakeBodyList.length - 1].x + 20;// 30(直径)
        snakeBody.y = this.snakeBodyList[this.snakeBodyList.length - 1].y + 20;
        // 添加至list
        this.snakeBodyList.push(snakeBody);
        this.addChild(this.snakeBodyList[this.snakeBodyList.length - 1]); // this.addChild(snakeBody); 为什么不直接这样用？
        // 指定新增蛇身索引为最小值
        this.setChildIndex(this.snakeBodyList[this.snakeBodyList.length - 1], 0);
    }

    public reduceBody(){ // 删除蛇尾一截
        this.removeChild(this.snakeBodyList[this.snakeBodyList.length - 1]);
        this.snakeBodyList.pop();
    }
    /**
        创建一个数组记录蛇移动路线轨迹上的坐标。
        蛇的每一节身体都按照这个路径点数组里的坐标移动。
        蛇移动的时候是帧事件，每帧更新蛇移动轨迹坐标的数组，更新蛇的每一节身体的坐标在蛇移动轨迹数组里对应的坐标。
        蛇移动方向是360度的方向都可以移动。
        移动的时候可以丝滑一点，别看着有断层。
     */
    public snakeMoveAngle(){ // 蛇的移动
        if(this.snakeBodyList.length != 0){
            let moveAngle: number = 0;
            if(this.isJoyStick){
                // 接受服务器传来的数据
                moveAngle = this.moveAngle;
            }
            else{
                moveAngle = Math.PI * Math.random() / 2;
                // 快要撞墙
                if(this.snakeBodyList[0].x < 15 || this.snakeBodyList[0].x > 985 || this.snakeBodyList[0].y < 15 || this.snakeBodyList[0].y > 985){
                        moveAngle = -moveAngle;
                }
            }
            this.snakeMove(moveAngle);
        }

    }

    private snakeMove(moveAngle: number){
        // 蛇头坐标
        let snakeHeadX = this.snakeBodyList[0].x + this.speed * Math.cos(moveAngle);
        let snakeHeadY = this.snakeBodyList[0].y + this.speed * Math.sin(moveAngle);
        var tween :egret.Tween;
        // 通过缓动动画实现蛇头的移动
        tween = egret.Tween.get(this.snakeBodyList[0])
        .to({x: snakeHeadX, y:snakeHeadY}, 200 / this.speed);

        // 通过缓动动画实现蛇名的移动
        this.snakeInfo.text = this.snakeName + '  ' + this.snakeBodyList.length;
        tween = egret.Tween.get(this.snakeInfo)
        .to({x: snakeHeadX - 50, y: snakeHeadY - 40}, 200 / this.speed);

        // 通过缓动动画实现蛇身的移动
        // 利用tween动画实现更平滑的移动
        for (let i = this.snakeBodyList.length - 1; i >= 1; i--){
            tween = egret.Tween.get(this.snakeBodyList[i])
            .to({x : this.snakeBodyList[i - 1].x, y: this.snakeBodyList[i - 1].y}, 500 / this.speed);
        }
    }

    // // 蛇移动速度改变
    // private speedUp(){
    //     if (!this.isSpeedUp){
    //         console.log('speedup!');
    //         this.speed = 10;
    //         this.isSpeedUp = true;
    //     }
    //     else{
    //         console.log('speeddown!');
    //         this.speed = 5;
    //         this.isSpeedUp = false;
    //     }
    // }

    public snakeRemoveBody(){
        for(let i = 0; i < this.snakeBodyList.length; i++){
            this.removeChild(this.snakeBodyList[i]);
        }
    }

            // 服务器发送过来的数据
        private webSocketDataHandler(event: egret.ProgressEvent): void {
            let str = this.gameSocket.readUTF();
            str = gameclient.util.ChatUtil.trim(str);
            if (str != "") {
                let stringBuffer = this.stringBuffer;
                stringBuffer += str;
                let index: number = stringBuffer.indexOf("</over>");//查找结束符号
                while (index != -1) {
                    let distr: string = stringBuffer.substring(0, index);
                    stringBuffer = stringBuffer.substring(index + 7, stringBuffer.length);
                    this.gameDataHelper(distr);//把数据转交个游戏数据分析方法处理
                    index = stringBuffer.indexOf("</over>");//查找结束符号
                }
                this.stringBuffer = stringBuffer;
            }
        }
        
        /* 游戏数据分析方法
		* 游戏数据处理类,该类中发现如果回来的数据为本类处理的数据
		* 则处理数据,如果是GameLogicEngine类处理的数据,就把数据传送给GameLogicEngine类的gameDataHelper方法
		*/
        private gameDataHelper(xmlStr: string): void {
            // egret.log(xmlStr);
            let tempList: Array<any> = gameclient.socketdata.XmlDataHelper.dateHelper(xmlStr);//解析数据,返回数据组数,如果该数组为null,表示不能解析成功
            if (tempList != null) {
                if (tempList[0] == "SnakeMove") { // 如果是蛇移动角度
                    this.moveAngle = parseFloat(tempList[1]);
                    console.log(this.moveAngle);
                }
            }
        }
}