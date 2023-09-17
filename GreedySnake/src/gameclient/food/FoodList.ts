class SnakeFood extends egret.DisplayObjectContainer{
    constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
    }

    public foodList: Food[] = [];
    private timerID : number; // 指向setInterval

    private init(){
        this.createFoods(); // 实现最初的生成
        this.timerID = egret.setInterval(this.createFoods, this, 5000); // 定时生成
    }

    private createFoods(){
        // 必定生成的5个小糖豆
        for (let i = 0; i < 5; i++){
            let food = new Food(1);
            this.foodList.push(food);
            this.addChild(food.food);
        }
        let prob = Math.random();
        // 可能生成的其他糖豆
        for(let i = 0; i < 3; i++){
            if(prob > 0.3){
                // 大糖豆和毒糖豆
                let food2 = new Food(2);
                this.foodList.push(food2);
                this.addChild(food2.food);

                let food3 = new Food(3);
                this.foodList.push(food3);
                this.addChild(food3.food);
            }
            if(prob > 0.8){
                let food = new Food(5);
                this.foodList.push(food);
                this.addChild(food.food);
            }
        }
        if(prob > 0.95){ // 可能产生的大麻雷子，以及其他稀奇玩意，每轮最多一个
            let food4 = new Food(4);
            this.foodList.push(food4);
            this.addChild(food4.food);
        }
    }

    // 蛇死亡后调用此方法在蛇身处生成糖豆
    public snakeDeathFood(foodPoint:egret.Point){
        let food = new Food(1, foodPoint);
        this.foodList.push(food);
        this.addChild(food.food);
    }

    // 游戏结束/暂停，停止生成糖豆
    public stopCreateFood(){
        egret.clearInterval(this.timerID);
    }

    // 删除被吃的糖豆
    public snakeEatFood(mySnake: Snake, eatenFood: Food):boolean{
        // 将被吃糖豆移出列表
        let index = this.foodList.indexOf(eatenFood);
        this.foodList.splice(index, 1);

        let snakeHeadPoint = new egret.Point();
        snakeHeadPoint.x = mySnake.snakeBodyList[0].x;
        snakeHeadPoint.y = mySnake.snakeBodyList[0].y;
        egret.setTimeout(() => {
            this.removeChild(eatenFood.food);
        }, this, 200);
        egret.Tween.get(eatenFood.food).to({x: snakeHeadPoint.x, y:snakeHeadPoint.y}, 200);
        // let index = this.foodList.indexOf(eatenFood);
        // this.foodList.splice(index, 1);
        // this.removeChild(eatenFood.food);
        switch(eatenFood.foodType){
            case (1): // 加一分，蛇身加一截
                mySnake.score += 1;
                mySnake.snakeBody();
                break;
            case (2): // 加五分，蛇身加五截
                mySnake.score += 5;
                for(let i = 0; i < 5; i++){
                    mySnake.snakeBody();
                }
                break;
            case (3): // 扣一分，蛇身减一截
                mySnake.score -= 1;
                if (mySnake.snakeBodyList.length == 1){ // 蛇尾扣完啦
                    return true;
                }
                else{
                    mySnake.reduceBody();
                }
                break;
            case (4): // 发痒的猴，寄啦
                this.boom(eatenFood);
                return true;
            case (5): // 喏，吸铁石
                // 扩大吃食物的范围，持续5S，可以加一个特效来展示持续时间
                mySnake.power = 80;
                egret.setTimeout(() => {mySnake.power = 0;}, this, 5000);
                break;
            case (6):
                break;
            default:
                console.log("魂淡，你吃了些什么玩意啊！！！")
                break;
        }
        return false;
    }

    // 删除出界的糖豆
    public outFood(outFood: Food){
        let type: number = outFood.foodType;
        let index = this.foodList.indexOf(outFood);
        this.foodList.splice(index, 1);
        this.removeChild(outFood.food);

        // 重新生成同类型糖豆
        outFood = new Food(type);
        this.foodList.push(outFood);
        this.addChild(outFood.food);
    }

    // 爆炸简单特效
    private boom(food: Food){
        let fire = new egret.Shape();
        // this.addChild(fire);
        fire.x = food.sitePoint.x;
        fire.y = food.sitePoint.y;
        let r = 20;
        fire.graphics.beginFill(0xff6600);
        fire.graphics.drawCircle(0, 0, r);
        fire.graphics.endFill();
        for(let i = 0; i < 9; i++){
            let startAngle = -20 + 40 * i;
            let topAngle = 40 * i;
            let endAngle = 20 + 40 * i;
            fire.graphics.beginFill(0xff6600);
            fire.graphics.lineStyle(1, 0xff6600);
            fire.graphics.moveTo(r * Math.sin(startAngle), r * Math.cos(startAngle));
            fire.graphics.lineTo(2 * r * Math.sin(topAngle), 2 * r * Math.cos(topAngle));
            fire.graphics.lineTo(r * Math.sin(endAngle), r * Math.cos(endAngle));
            fire.graphics.endFill();
        }
        this.addChild(fire);
        // egret.setTimeout(() => {this.addChild(fire)}, this, 500);
        // egret.Tween.get(food).to({alpha: 0}, 500);
        egret.setTimeout(() => {this.removeChild(fire)}, this, 300);
    }

}
