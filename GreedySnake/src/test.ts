// /**
//  * 地图左下角(200, 780)创建一个摇杆，根据摇杆来控制蛇移动的方向，
//  */
// class MyJoystick extends egret.DisplayObjectContainer{
//     constructor(){
//         super();
//         this.init();
//     }
//     private joystickBg : egret.Shape;
//     private joystick : egret.Shape;
//     private init(){
//         let joystickBg = this.joystickBg;
//         if (joystickBg == null){
//             joystickBg = new egret.Shape();
//             this.joystickBg = joystickBg;
//         }
//         let joystick = this.joystick;
//         if(joystick == null){
//             joystick = new egret.Shape();
//             this.joystick = joystick;
//         }
//         // 摇杆底座
//         joystickBg.graphics.beginFill(0xccffff, 0.4);
//         joystickBg.graphics.drawCircle(200, 780, 100);
//         joystickBg.graphics.endFill();
//         this.addChild(joystickBg);

//         // 摇杆按钮
//         joystick.graphics.beginFill(0x00ff00, 0.4);
//         joystick.graphics.drawCircle(200, 780, 30);
//         joystick.graphics.endFill();
//         this.addChild(joystick);

//         joystick.touchEnabled = true;
//         joystick.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onJoystick, this);
//         joystick.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveJoystick, this);
//         joystick.addEventListener(egret.TouchEvent.TOUCH_END, this.removeJoystick, this);
//     }
//     private isStatus:boolean = false;
//     private touchPoint = new egret.Point();
//     public moveAngle : number = 0; // 传入Snake类，配合速度进行移动
//     // 获取触摸点坐标，同时进入拖拽状态
//     private onJoystick(e:egret.TouchEvent){
//         this.isStatus = true;
//         this.touchPoint.x = e.stageX;
//         this.touchPoint.y = e.stageY;
//     }
//     // 拖拽
//     private moveJoystick(e:egret.TouchEvent){
//         if(this.isStatus){
//             // 计算触摸点离摇杆底座中心的位置
//             let offsetX = e.stageX - this.touchPoint.x;
//             let offsetY = e.stageY - this.touchPoint.y;
//             let distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
//             // 弧度
//             let moveRad = Math.atan2(offsetY, offsetX);
//             // 转化为角度
//             this.moveAngle = moveRad * 180 / Math.PI;
//             console.log("Joystick.moveAngle:", this.moveAngle);;
//             if(distance < 100){ // 触摸点在摇杆底座范围内
//                 this.joystick.x = this.joystickBg.x + offsetX;
//                 this.joystick.y = this.joystickBg.y + offsetY;
//             }
//             else{ // 触摸点在摇杆底座范围之外
//                 let ratio = 100 / distance;
//                 this.joystick.x = this.joystickBg.x + offsetX * ratio;
//                 this.joystick.y = this.joystickBg.y + offsetY * ratio;
//             }
//         }
//     }
//     private removeJoystick(){
//         // 回归原点
//         this.isStatus = false;
//         this.joystick.x = this.joystickBg.x;
//         this.joystick.y = this.joystickBg.y;
//     }
// }


// // 碰撞检测
//     private snakeCollisionDetection():boolean{
//         // 将蛇头坐标填入egret.Point()
//         let snakeHeadPoint = new egret.Point();
//         if(this.mySnake){
//             snakeHeadPoint.x = this.mySnake.snakeBodyList[0].x;
//             snakeHeadPoint.y = this.mySnake.snakeBodyList[0].y;
//         }
//         else{
//             return true;
//         }

//         // 蛇是可以吃糖豆的，判断蛇头与糖豆之间的距离，如果这个距离小于16(蛇头半径+1),蛇就可以吃糖豆，吃糖豆是一个动态变化过程，
//         // 豆子移动到蛇头附近再消失，同时给蛇在蛇尾增加一节长度，也就是加一个圆圈。
//         let tempNum = this.snakeHitFood(snakeHeadPoint, this.snakeFood);
//         if (tempNum != -1){ // 吃到了糖豆，增加一节蛇身，蛇得分加一，删除被吃的糖豆
//             console.log('eat!');
//             this.mySnake.snakeBody();
//             this.mySnake.score += 1;
//             this.snakeFood.removeFood(tempNum);
//         }

//         // 蛇头与边框的碰撞检测
//         if (this.snakeHitBorder(snakeHeadPoint)){
//             let tempPointList = [];
//             for (let i = 0; i < this.mySnake.snakeBodyList.length; i++){
//                 // 获取老蛇蛇身位置
//                 let snakeBodyPoint = new egret.Point();
//                 snakeBodyPoint.x = this.mySnake.snakeBodyList[i].x;
//                 snakeBodyPoint.y = this.mySnake.snakeBodyList[i].y;
//                 tempPointList.push(snakeBodyPoint);
//             }
//             // 删除老蛇
//             if (this.mySnake){
//                 this.removeChild(this.mySnake);
//                 this.mySnake = null;

//                 for(let i = 0; i < tempPointList.length; i++){
//                     // 在蛇死亡的地方生成糖豆
//                     console.log("food + 1");
//                     this.snakeFood.snakeDeathFood(tempPointList[i]);
//                 }
//             }
//             // 一秒之后在其他地方生成一条新蛇，产生失败
//             egret.setTimeout(() => {
//                 this.mySnake = new Snake(true, true, 'hhhh');
//                 this.addChild(this.mySnake);
//             }, this, 1000)
//             // Uncaught TypeError: Cannot read property 'snakeBodyList' of null
//         }

//         // 蛇头与蛇头碰撞，长度小的会死亡

//         // 如果蛇头的中心点与其他蛇身体的中心点之间的距离==（蛇头宽度+碰撞蛇身体宽度）/2就会死亡
//         return true;
//     }

//     // 蛇头与食物是否发生碰撞
//     private snakeHitFood(mySnakeHead: egret.Point, myFood: SnakeFood):number{
//         // 计算蛇头与食物的距离，蛇头半径为15
//         for (let i = 0; i < myFood.foodList.length; i++){
//             let distance = Math.sqrt(Math.pow(mySnakeHead.x - myFood.foodList[i].x,2) + Math.pow(mySnakeHead.y - myFood.foodList[i].y, 2));
//             if(distance < 16){
//                 return i;
//             }
//         }
//         return -1;
//     }

//     // 蛇头与舞台边框是否发生碰撞，发生碰撞返回true
//     private snakeHitBorder(mySnakeHead: egret.Point): boolean{
//         if(mySnakeHead.x < 10 || mySnakeHead.x > 990|| mySnakeHead.y < 10 || mySnakeHead.y > 990){
//             return true;
//         }
//         return false;
//     }

//     // 蛇头与蛇头相撞
//     private headHitHead(){

//     }
class Test extends egret.DisplayObjectContainer{
    constructor(){
        super();
    }
    public clear(){

    }
}
// }                    let tempPointList = [];
//                     for (let j = 0; j < this.snakeList[i].snakeBodyList.length; j++){
//                         // 获取老蛇蛇身位置
//                         let snakeBodyPoint = new egret.Point();
//                         snakeBodyPoint.x = this.snakeList[i].snakeBodyList[j].x;
//                         snakeBodyPoint.y = this.snakeList[i].snakeBodyList[j].y;
//                         tempPointList.push(snakeBodyPoint);
//                     }
//                     // 获取老蛇名字
//                     let snakeName: string = this.snakeList[i].snakeName;
//                     // 删除老蛇
//                     this.snakeList[i].snakeRemoveBody();
//                     this.snakeList.splice(i);
//                     this.snakeList[i] = null;

//                     for(let j = 0; j < tempPointList.length; j++){
//                         // 在蛇死亡的地方生成糖豆
//                         console.log("food + 1");
//                         this.snakeFood.snakeDeathFood(tempPointList[j]);
//                     }
//                     // 一秒之后在其他地方生成一条新蛇
//                     egret.setTimeout(() => {
//                         this.snakeList[i] = new Snake(true, true, snakeName);
//                         egret.MainContext.instance.stage.addChild(this.snakeList[i]);
//                         this.snakeList.push(this.snakeList[i]);
//                     }, this, 1000)
// class Food extends egret.DisplayObjectContainer{
//     constructor(sitePoint?: egret.Point){
//         super();
//         if(sitePoint == undefined){
//             sitePoint = this.randomPoint();
//         }
//         this.sitePoint = sitePoint;
//         // this.init();
//     };
//     private sitePoint : egret.Point;
//     private randomPoint():egret.Point{
//         let randomPoint = new egret.Point();
//         randomPoint.x = Math.floor(Math.random() * 1000);// 向下取整
//         randomPoint.y = Math.floor(Math.random() * 1000);
//         return randomPoint;
//     }
// }