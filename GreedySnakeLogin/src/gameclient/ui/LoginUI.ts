module gameclient.ui{
    export class LoginUI extends egret.DisplayObjectContainer{
        
        private loginButton: eui.Button; // 登录按钮
        private registerButton:eui.Button; // 注册按钮
        

        constructor(){
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.LoginScene, this);
        }

        public userName: string;
        public password: string;

        private userNameInput: egret.TextField;
        private passwordInput: egret.TextField;
        private LoginScene(){
            let userName = new egret.TextField();
            let password = new egret.TextField();

            this.userNameInput = userName;
            this.passwordInput = password;
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
            this.addChild(userName);
            userName.addEventListener(egret.Event.CHANGE, this.userNameText, this);

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
            password.addEventListener(egret.Event.CHANGE, this.passwordText, this);

            // 注册按钮
            let bt = new eui.Button();
            this.registerButton = bt;

            bt.label = '注册';     
            bt.horizontalCenter = 0;
            bt.verticalCenter = 0;
            bt.x = 270;
            bt.y = 650;
            bt.width = 200;
            bt.height = 100;
            this.addChild(this.registerButton);
            /**
             * 修改按钮文本以及边框，并且要先添加到舞台
             */
            (<eui.Label>this.registerButton.labelDisplay).size = 50;
            (<eui.Label>this.registerButton.labelDisplay).textColor = 0xffffff;
            (<eui.Label>this.registerButton.labelDisplay).textAlign = egret.HorizontalAlign.CENTER;
            (<eui.Label>this.registerButton.labelDisplay).verticalCenter = egret.VerticalAlign.MIDDLE;

            // 登录按钮
            let bt1 = new eui.Button();
            this.loginButton = bt1;
            bt1.label = '登录';
            
            bt1.horizontalCenter = 0;
            bt1.verticalCenter = 0;
            bt1.x = 530;
            bt1.y = 650;
            bt1.width = 200;
            bt1.height = 100;
            this.addChild(this.loginButton);
            /**
             * 修改按钮文本以及边框，并且要先添加到舞台
             */
            (<eui.Label>this.loginButton.labelDisplay).size = 50;
            (<eui.Label>this.loginButton.labelDisplay).textColor = 0xffffff;
            (<eui.Label>this.loginButton.labelDisplay).textAlign = egret.HorizontalAlign.CENTER;
            (<eui.Label>this.loginButton.labelDisplay).verticalCenter = egret.VerticalAlign.MIDDLE;
            
        }

        private userNameText(){
            this.userName = this.userNameInput.text;
        }

        private passwordText(){
            this.password = this.passwordInput.text;
        }

        public addLoginButtonEventListener(eventName: string, eventFun: Function, eventObject: any){
            this.loginButton.addEventListener(eventName, eventFun, eventObject);
        }

        public addRegisterButtonEventListener(eventName: string, eventFun: Function, eventObject: any){
            this.registerButton.addEventListener(eventName, eventFun, eventObject);
        }
    }
}