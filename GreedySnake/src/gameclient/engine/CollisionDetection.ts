/**
 * 四：蛇碰撞检测（collision detection）
 * 蛇是可以吃糖豆的，判断蛇头与糖豆之间的距离，如果这个距离<某个值,蛇就可以吃糖豆，吃糖豆是一个动态变化过程，
 * 豆子移动到蛇头附近再消失，同时给蛇在蛇尾增加一节长度，也就是加一个圆圈。
 * 蛇头移动超出地图边界会死亡。
 * 蛇头与蛇头碰撞，长度小的会死亡。
 * 蛇头碰到自己的身体不会死亡，蛇头碰到其他蛇的身体会死亡。
 * 判断蛇头与其他蛇身体的之间的距离，
 */

class CollisionDetection extends egret.DisplayObjectContainer{
    constructor(snakeList: Snake[], snakeFood: SnakeFood, gameSocket: egret.WebSocket){
        super();
        this.snakeFood = snakeFood;
        this.snakeList = snakeList;
        this.gameSocket = gameSocket;
    }

    private snakeList : Snake[];
    private snakeFood : SnakeFood;
    private gameSocket : egret.WebSocket;

    private stringBuffer: string = ""; // 数据缓冲
    
    public snakeCollisionDetection = ():boolean =>{
        // 对糖豆进行边缘检测，生成在边界的糖豆删除后重新生成
        for(let i = 0; i < this.snakeFood.foodList.length; i++){
            if(this.foodHitBorder(this.snakeFood.foodList[i])){
                this.snakeFood.outFood(this.snakeFood.foodList[i]);
            }
        }
        
        // 对每条蛇进行边缘检测以及吃糖豆检测
        for (let i = 0; i < this.snakeList.length; i++){
                if (this.snakeList[i].snakeBodyList.length >= 1){
                    // 将蛇头坐标填入egret.Point()
                    let snakeHeadPoint = new egret.Point();
                    snakeHeadPoint.x = this.snakeList[i].snakeBodyList[0].x;
                    snakeHeadPoint.y = this.snakeList[i].snakeBodyList[0].y;

                    // 蛇是可以吃糖豆的，判断蛇头与糖豆之间的距离，如果这个距离小于16(蛇头半径+1),蛇就可以吃糖豆，吃糖豆是一个动态变化过程，
                    // 豆子移动到蛇头附近再消失，同时给蛇在蛇尾增加一节长度，也就是加一个圆圈。
                    let eatenFood = this.snakeHitFood(this.snakeList[i], this.snakeFood);
                    if (eatenFood != null){ // 吃到了糖豆，执行对应糖豆被吃的方法
                        // console.log('eat!');
                        // 吃糖豆
                        if(this.snakeFood.snakeEatFood(this.snakeList[i], eatenFood)){
                            this.snakeRes(this.snakeList[i]);
                            
                            // 发送得分字符串（蛇名+蛇分）
                            let message = gameclient.socketdata.SendXmlHelper.buildSnakeScoreXml(this.snakeList[i].snakeName, this.snakeList[i].score);
                            this.sendXmlToServer(message);
                            continue;
                        }
                    }
                    // 蛇头与边框的碰撞检测
                    if (this.snakeHitBorder(this.snakeList[i])){
                        // console.log('hit border!');
                        this.snakeRes(this.snakeList[i]);
                    }
        }
    }
        // 对蛇与蛇的碰撞检测
        // 蛇头碰撞
        for(let i = 0; i < this.snakeList.length - 1; i++){
            for(let j = i + 1; j < this.snakeList.length; j++){
                if(this.snakeList[i].snakeBodyList.length * this.snakeList[j].snakeBodyList.length != 0){
                    if(this.headHitHead(this.snakeList[i], this.snakeList[j])){ // 蛇头发生碰撞，短的死
                        if (this.snakeList[i].snakeBodyList.length > this.snakeList[j].snakeBodyList.length){
                            this.snakeRes(this.snakeList[j]);
                        }
                        else if (this.snakeList[i].snakeBodyList.length < this.snakeList[j].snakeBodyList.length){
                            this.snakeRes(this.snakeList[i]);
                        }
                        else{
                            continue;
                    }
                }
                }
            }
        }
        // 蛇头碰蛇身
        for(let i = 0; i < this.snakeList.length; i++){
            if(this.headHitBody(this.snakeList[i])){
                this.snakeRes(this.snakeList[i]);
            }
        }
        return true;        
    }

    // 蛇头与食物是否发生碰撞
    private snakeHitFood(mySnake: Snake, myFood: SnakeFood): Food{
        let mySnakeHead = new egret.Point();
        mySnakeHead.x = mySnake.snakeBodyList[0].x;
        mySnakeHead.y = mySnake.snakeBodyList[0].y;
        // 计算蛇头与食物的距离，蛇头半径为15
        for (let i = 0; i < myFood.foodList.length; i++){
            let distance = Math.sqrt(Math.pow(mySnakeHead.x - myFood.foodList[i].sitePoint.x, 2) + Math.pow(mySnakeHead.y - myFood.foodList[i].sitePoint.y, 2));
            if(distance < 80 + mySnake.power){ // 吸取食物
                return myFood.foodList[i];
            }
        }
        return null;
    }

    // 蛇头与舞台边框是否发生碰撞，发生碰撞返回true
    private snakeHitBorder(mySnake: Snake): boolean{
        let mySnakeHead = new egret.Point();
        mySnakeHead.x = mySnake.snakeBodyList[0].x;
        mySnakeHead.y = mySnake.snakeBodyList[0].y;
        if(mySnakeHead.x < 10 || mySnakeHead.x > 990|| mySnakeHead.y < 10 || mySnakeHead.y > 990){
            // console.log("hit !");
            return true;
        }
        return false;
    }

    // 食物与舞台边框是否发生碰撞，发生碰撞返回true
    private foodHitBorder(myFood: Food): boolean{
        let tempx = myFood.food.x;
        let tempy = myFood.food.y;
        if(tempx < 10 || tempx > 990 || tempy < 10 || tempy > 990)
            return true;
        return false;
    }

    // 蛇头与蛇头相撞
    private headHitHead(mySnake: Snake, anSnake: Snake): boolean{
        let offX = mySnake.snakeBodyList[0].x - anSnake.snakeBodyList[0].x;
        let offY = mySnake.snakeBodyList[0].y - anSnake.snakeBodyList[0].y;
        let distance = Math.sqrt(Math.pow(offX, 2) + Math.pow(offY, 2));
        if (distance < 20){
            return true;
        }
        return false;
    }

    // 蛇头与蛇身相撞，第二节蛇身与蛇头相距太近，有点小问题
    // 如果蛇头的中心点与其他蛇身体的中心点之间的距离==（蛇头宽度+碰撞蛇身体宽度）/2就会死亡
    private headHitBody(mySnake: Snake): boolean{ // mySnake撞到其他蛇头
        for(let j = 0; j < this.snakeList.length; j++){
            if (mySnake != this.snakeList[j] && mySnake.snakeBodyList.length * this.snakeList[j].snakeBodyList.length != 0){
                for(let i = 1; i < this.snakeList[j].snakeBodyList.length; i++){
                    let offX = mySnake.snakeBodyList[0].x - this.snakeList[j].snakeBodyList[i].x;
                    let offY = mySnake.snakeBodyList[0].y - this.snakeList[j].snakeBodyList[i].y;
                    let distance = Math.sqrt(Math.pow(offX, 2) + Math.pow(offY, 2));
                    if (distance < 20){ // 
                        return true;
                    }
                }
            }
        }
        return false;
    }

    private snakeRes(mySnake: Snake){
        let tempPointList = [];
        for (let j = 0; j < mySnake.snakeBodyList.length; j++){
            // 获取死亡位置
            let snakeBodyPoint = new egret.Point();
            snakeBodyPoint.x = mySnake.snakeBodyList[j].x;
            snakeBodyPoint.y = mySnake.snakeBodyList[j].y;
            tempPointList.push(snakeBodyPoint);
            mySnake.removeChild(mySnake.snakeBodyList[j]);
        }
        // 删除原身体，重新创建，恢复初始速度
        mySnake.speed = 5;
        mySnake.isSpeedUp = false;
        mySnake.power = 0;
        mySnake.removeChild(mySnake.snakeInfo);
        mySnake.snakeBodyList = [];
        for(let j = 0; j < tempPointList.length; j++){
            // 在蛇死亡的地方生成糖豆
            this.snakeFood.snakeDeathFood(tempPointList[j]);
        }
        // 一秒之后在其他地方生成一条新蛇
        egret.setTimeout(() => {
            mySnake.createNewSnake();
        }, this, 1000)
    }

        //发送数据到服务器端
    private sendXmlToServer(xmlStr: string): void {
        //websocket
        // let gameSocket = this.gameSocket;
        if (this.gameSocket != null && this.gameSocket.connected == true) {
            // this.gameSocket.writeUTFBytes(xmlStr + "\n");
            this.gameSocket.writeUTF(xmlStr + "\n");
            this.gameSocket.flush();//对套接字输出缓冲区中积累的所有数据进行刷新
            console.log("send!");
        }
        else{
            console.log("failed ");
        }
    }
}