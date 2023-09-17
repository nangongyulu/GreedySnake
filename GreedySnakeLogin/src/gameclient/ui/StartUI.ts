module gameclient.ui{
    export class StartUI extends egret.DisplayObjectContainer{
        private startButton: eui.Button;

        constructor(){
            super();
            
            // 开始按钮
            let bt = new eui.Button();
            
            this.startButton = bt;
            bt.label = "开始";
            bt.x = 400;
            bt.y = 600;
            bt.width = 200;
            bt.height = 100;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        }

        

        private init(){
            let bgMain = new egret.Bitmap(RES.getRes("snake_bg_png"));
            // 主页面背景
            bgMain.width = this.stage.stageWidth;
            bgMain.height = this.stage.stageHeight;
            this.addChild(bgMain);
            
            this.addChild(this.startButton);
            (<eui.Label>this.startButton.labelDisplay).size = 50;
        }
        public addStartButtonEventListener(eventName: string, eventFun: Function, eventObject: any){
            this.startButton.addEventListener(eventName, eventFun, eventObject);
        }

        public addConnectEventListener(eventName: string, eventFun: Function, eventObject: any){
            this.startButton.addEventListener(eventName, eventFun, eventObject);
        }
    }
}   