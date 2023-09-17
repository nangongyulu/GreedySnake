module gameclient.engine{
    export class StartGame extends egret.DisplayObjectContainer{
        constructor(){
            super();
            this.connectServer();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.gameScene, this);
        }

        // 游戏界面
        private snakeFood : SnakeFood // 糖豆产生
        private clock : Clock;
        // private snakeNameList = []; // 存储所有蛇的昵称
        private mySnake: Snake;
        private snakeList : Snake[]; // 存储所有的蛇，自己操控的以及自动的
        private collisionDetection : CollisionDetection; // 碰撞检测
        private scoreScroller : MyScroller; // 展示对局中的得分

        private gameScene(){

            // 游戏背景
            let bgGame = new egret.Bitmap(RES.getRes("bgGame_jpg"));
            bgGame.width = this.stage.stageWidth;
            bgGame.height = this.stage.stageHeight;
            // 将舞台背景置于最底层
            this.addChildAt(bgGame, 0);

            // 初始化
            let clock = new Clock(0, 0, 10);
            this.clock = clock;
            this.addChild(clock);

            // 添加蛇
            this.createSnakes();

            // // 展示得分面板
            // let scoreScroller = new MyScroller(this.snakeList);
            // this.scoreScroller = scoreScroller;
            // this.addChild(scoreScroller);


            // 利用帧事件监听游戏结束
            egret.startTick(this.gameOver, this);

        }

        private createSnakes(){
            // 可以接受登录端的信息，为每一个登录的玩家创建一条以他们昵称起名的蛇
            let snakeList = [];
            this.snakeList = snakeList;

            let mySnake = new Snake(true, true, "hhhh");
            this.mySnake = mySnake;
            this.addChild(mySnake);
            snakeList.push(mySnake);
            let message = gameclient.socketdata.SendXmlHelper.buildSnakeScoreXml(mySnake.snakeName, mySnake.score);
            this.sendXmlToServer(message);

            for(let i = 0; i < 5; i++){
                let AISnake = new Snake(false, false, "000" + i.toString());
                this.addChild(AISnake);
                snakeList.push(AISnake);
                let tempMessage = gameclient.socketdata.SendXmlHelper.buildSnakeScoreXml(AISnake.snakeName, AISnake.score);
                this.sendXmlToServer(tempMessage);
            }

            let snakeFood = new SnakeFood();
            this.snakeFood = snakeFood;
            this.addChild(snakeFood);

            let collisionDetection = new CollisionDetection(snakeList, snakeFood, this.gameSocket);
            this.collisionDetection = collisionDetection;

            // 帧事件监听碰撞
            egret.startTick(collisionDetection.snakeCollisionDetection, this);
        }
        private gameOver(): boolean{
            // 游戏结束，展示得分面板
            if(this.clock.clockStatus){
                console.log('gameover');
                this.snakeFood.stopCreateFood();
                egret.stopTick(this.collisionDetection.snakeCollisionDetection, this);
                egret.MainContext.instance.stage;
                // 移出监听报错
                for(let i = 0; i < this.snakeList.length; i++){
                    if(this.snakeList[i]){
                        this.snakeList[i].removeEventListener(egret.TouchEvent.ENTER_FRAME, this.snakeList[i].snakeMoveAngle, this.snakeList[i]);
                    }
                }
                egret.stopTick(this.gameOver, this);
                this.snakeScore();
                return false; // 游戏结束，结束监听
            }
            return true;
        }
        private snakeScore(){ // 展示结算面板
            let scoreTx = new egret.TextField();
            this.addChild(scoreTx);
            // if(this.mySnake){
            //     scoreTx.text = "最终得分：" + this.mySnake.score;
            // }
            scoreTx.text = "游戏结束";
            scoreTx.size = 40;
            scoreTx.textColor = 0x00ff00;
            scoreTx.verticalAlign = egret.VerticalAlign.MIDDLE;
            scoreTx.textAlign = egret.HorizontalAlign.CENTER;
            scoreTx.x = 250;
            scoreTx.y = 350;
            scoreTx.width = 500;
            scoreTx.height = 300;
            scoreTx.background = true;
            scoreTx.backgroundColor = 0xffff99;
            scoreTx.alpha = 0.7;
        }


        // WebSocket
        private gameSocket: egret.WebSocket;
        private stringBuffer: string = "";//数据缓冲区

        private connectServer(): void {
            let url = "192.168.1.30"; // localhost
            let port = 8205;

            // websocket
            let gameSocket = this.gameSocket;
            if (gameSocket != null) {// 如果已经打开了Socket 则先关闭
                this.disposeGameSocket();
            }
            gameSocket = new egret.WebSocket(); //构造socket
            this.gameSocket = gameSocket;
            gameSocket.addEventListener(egret.Event.CLOSE, this.closeHandler, this); //socket关闭
            gameSocket.addEventListener(egret.Event.CONNECT, this.connectHandler, this); //socket连接
            gameSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.ioErrorHandler, this);//socket ioError
            gameSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.webSocketDataHandler, this); //接收数据
            gameSocket.connect(url, port);//链接socket 

            // 发送游戏开始时间戳

        }

        //发送数据到服务器端
        private sendXmlToServer(xmlStr: string): void {
            //websocket
            let gameSocket = this.gameSocket;
            if (gameSocket != null && gameSocket.connected == true) {
                // this.gameSocket.writeUTFBytes(xmlStr + "\n");
                gameSocket.writeUTF(xmlStr + "\n");
                gameSocket.flush();//对套接字输出缓冲区中积累的所有数据进行刷新
                console.log("successfully send");
            }
            else{
                console.log("failed to send");
            }
        }
        // private clickLoginBtn2(event: egret.Event): void {
        //     let sendXml: string = socketdata.SendXmlHelper.buildUserLoginXml("testuser2","222222");//构造活跃信息xml
        //     this.sendXmlToServer(sendXml);//发送xml文档到服务器
        // }

        // 服务器发送过来的数据
        private webSocketDataHandler(event: egret.ProgressEvent): void {
            let str = this.gameSocket.readUTF();
            str = util.ChatUtil.trim(str);
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
            let tempList: Array<any> = socketdata.XmlDataHelper.dateHelper(xmlStr);//解析数据,返回数据组数,如果该数组为null,表示不能解析成功
            if (tempList != null) {
                let tempstr = tempList[0];
                switch(tempstr){
                    case("SnakeMove"): // 蛇移动角度
                        // let angle = parseInt(tempList[1]);
                        // for(let i = 0; i < this.snakeList.length; this){
                        //     if(tempList[2] == this.snakeList[i].snakeName){
                        //         this.snakeList[i].moveAngle = angle;
                        //     }
                        // }
                        let angle = parseInt(tempList[1]);
                        this.mySnake.moveAngle = angle;
                        break;
                    // case("LoginSuccessUser"):
                    //     let snake = new Snake(true, true, tempList[1]);
                    //     this.addChild(snake);
                    //     this.snakeList.push(snake);
                    //     this.snakeNameList.push(tempList[1]);
                    //     break;
                }
                
            }
        }

        /**
         * 释放Socket连接
         */
        private disposeGameSocket(): void {
            // 测试：websocket
            let gameSocket = this.gameSocket;
            if (gameSocket != null) {
                if (gameSocket.hasEventListener(egret.Event.CLOSE)) {
                    gameSocket.removeEventListener(egret.Event.CLOSE, this.closeHandler, this);
                }
                if (gameSocket.hasEventListener(egret.Event.CONNECT)) {
                    gameSocket.removeEventListener(egret.Event.CONNECT, this.connectHandler, this);
                }
                if (gameSocket.hasEventListener(egret.IOErrorEvent.IO_ERROR)) {
                    gameSocket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.ioErrorHandler, this);
                }
                if (gameSocket.hasEventListener(egret.ProgressEvent.SOCKET_DATA)) {
                    gameSocket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.webSocketDataHandler, this);
                }
                gameSocket.close();//关闭连接
                this.gameSocket = null;
            }
        }

        //连接关闭
        private closeHandler(event: egret.Event): void {
            console.log("连接关闭");
        }

        //socket连接成功
        private connectHandler(event: egret.Event): void {
            console.log("连接成功");
            this.gameScene();
        }

        //连接失败
        private ioErrorHandler(event: egret.IOErrorEvent): void {
            console.log("连接失败");
        }
    }
        
}