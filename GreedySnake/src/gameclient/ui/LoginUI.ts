module gameclient.engine{
    export class LoginUI extends egret.DisplayObjectContainer{
        
        private loginButton: eui.Button; // 登录按钮
        private registerButton:eui.Button; // 注册按钮
        
        private txMain : egret.TextField; // 主界面文本

        constructor(){
            super();
            // 登录按钮
            let bt = new eui.Button();
            this.loginButton = bt;
            bt.label = '登录';
            
            bt.horizontalCenter = 0;
            bt.verticalCenter = 0;
            bt.x = 270;
            bt.y = 650;
            bt.width = 460;
            bt.height = 100;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        }

        private init(){

            let bgMain = new egret.Bitmap(RES.getRes("bg_jpg"));
            // 主页面背景
            bgMain.width = this.stage.stageWidth;
            bgMain.height = this.stage.stageHeight;
            this.addChild(bgMain);

            // 主页面文字
            let txMain = new egret.TextField();
            txMain.text = "点击任意地方开始游戏";
            txMain.size = 60;
            txMain.width = 800;
            txMain.height = 200;
            txMain.textColor = 0xff00ff;
            txMain.x = 100;
            txMain.y = 600;
            txMain.anchorOffsetX = -20;
            txMain.anchorOffsetY = -40; 
            txMain.textAlign = egret.HorizontalAlign.CENTER;
            txMain.verticalAlign = egret.VerticalAlign.MIDDLE;

            // 文本简易闪烁效果
            egret.Tween.get(txMain, {loop:true})
            .to({alpha: 0.8, scaleX: 0.95, scaleY: 0.95}, 1000).to({alpha: 1, scaleX: 1, scaleY: 1}, 1000);
            this.addChild(txMain);

            bgMain.touchEnabled = true;
            bgMain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.LoginScene, this); 
        }

        public userName: String;
        public password: String;
        private LoginScene(){
            this.removeChildren();

            let userName = new egret.TextField();
            let password = new egret.TextField();

            // 登录背景
            let bg = new egret.Bitmap(RES.getRes('bg_black_jpg'));
            bg.width = this.stage.stageWidth;
            bg.height = this.stage.stageHeight;
            bg.alpha = 0.5;
            this.addChild(bg);

            // 登录窗口
            // 用户名
            let userPic = new egret.Bitmap(RES.getRes("bg_user_png"));
            userPic.x = 280;
            userPic.y = 400;
            userPic.height = 50;
            userPic.width = 40;
            this.addChild(userPic);

            userName.x = 330;
            userName.y = 400;
            userName.width = 380;
            userName.height = 50;
            userName.size = 30;
            userName.verticalAlign = egret.VerticalAlign.MIDDLE;
            userName.type = egret.TextFieldType.INPUT;
            userName.inputType = egret.TextFieldInputType.TEXT;
            userName.border = true;
            userName.borderColor = 0x3333ff;
            console.log(userName.text);
            this.addChild(userName);

            // 密码
            let passPic = new egret.Bitmap(RES.getRes("bg_lock_png"));
            passPic.x = 280;
            passPic.y = 500;
            passPic.width = 40;
            passPic.height = 50;
            this.addChild(passPic);

            password.x = 330;
            password.y = 500;
            password.width = 380;
            password.height = 50;
            password.size = 30;
            password.verticalAlign = egret.VerticalAlign.MIDDLE;
            password.type = egret.TextFieldType.INPUT;
            password.inputType = egret.TextFieldInputType.PASSWORD;
            password.border = true;
            password.borderColor = 0x3333ff;
            this.addChild(password);

            this.addChild(this.loginButton);
            /**
             * 修改按钮文本以及边框，并且要先添加到舞台
             */
            (<eui.Label>this.loginButton.labelDisplay).size = 50;
            (<eui.Label>this.loginButton.labelDisplay).textColor = 0xffffff;
            (<eui.Label>this.loginButton.labelDisplay).textAlign = egret.HorizontalAlign.CENTER;
            (<eui.Label>this.loginButton.labelDisplay).verticalCenter = egret.VerticalAlign.MIDDLE;
            this.userName = userName.text;
            this.password = password.text;
        }

        public addConnectEventListener(eventName: string, eventFun: Function, eventObject: any){
            this.loginButton.addEventListener(eventName, eventFun, eventObject);
        }

        public addLoginButtonEventListener(eventName: string, eventFun: Function, eventObject: any){
            this.loginButton.addEventListener(eventName, eventFun, eventObject);
        }

        public addRegisterButtonEventListener(eventName: string, eventFun: Function, eventObject: any){
            this.registerButton.addEventListener(eventName, eventFun, eventObject);
        }
    }
}