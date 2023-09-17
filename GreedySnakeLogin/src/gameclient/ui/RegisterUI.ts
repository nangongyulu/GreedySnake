/**
 * 注册信息的传递
 * 用户名的实时查重
 * 注册界面与登录界面的切换
 */

module gameclient.ui{
    export class RegisterUI extends egret.DisplayObjectContainer{
        
        public static registerButton: eui.Button; // 注册按钮
        private stringBuffer: string = "";//数据缓冲区
        private gameSocket: egret.WebSocket; // gamelogic的socket

        public getRegisterButton():eui.Button{
            if(!RegisterUI.registerButton){
                RegisterUI.registerButton = new eui.Button();
            }
            return RegisterUI.registerButton;
        }

        constructor(gameSocket: egret.WebSocket){
            super();
            this.gameSocket = gameSocket;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.registerScene, this);        
        }
    

        public userName: string;
        public password: string;
        public nickName: string;
        public isRegister: boolean = false;

        private backforward: egret.TextField;
        private isUsernameChecked: boolean = false;
        private isPasswordChecked: boolean = false;
        private nickNameInput: egret.TextField;
        private passwordInput: egret.TextField;
        private passwordInputValidate: egret.TextField;
        private userNameInput: egret.TextField;
        private registerScene(){

            let userName = new egret.TextField();
            let password = new egret.TextField();
            let nickName = new egret.TextField();
            let passwordValidate = new egret.TextField();
            let backforward = new egret.TextField();
            this.backforward = backforward;

            backforward.text = "< 返回";
            backforward.x = 50;
            backforward.y = 50;
            backforward.width = 200;
            backforward.height = 70;
            backforward.size = 50;
            backforward.textColor = 0xffffff;
            backforward.touchEnabled = true;
            this.addChild(backforward);
            

            // 登录背景
            let bg = new egret.Bitmap(RES.getRes('bg_black_jpg'));
            bg.width = this.stage.stageWidth;
            bg.height = this.stage.stageHeight;
            bg.alpha = 0.5;
            this.addChild(bg);

            // 登录窗口
            // 昵称
            let tx1 = new egret.TextField();
            tx1.text = "请输入您的昵称：";
            tx1.x = 300;
            tx1.y = 210;
            tx1.width = 380;
            tx1.height = 50;
            tx1.size = 30;
            tx1.textColor = 0x000000;
            this.addChild(tx1);

            nickName.x = 300;
            nickName.y = 250;
            nickName.width = 380;
            nickName.height = 50;
            nickName.size = 30;
            nickName.verticalAlign = egret.VerticalAlign.MIDDLE;
            nickName.type = egret.TextFieldType.INPUT;
            nickName.inputType = egret.TextFieldInputType.TEXT;
            nickName.border = true;
            nickName.borderColor = 0x3333ff;
            this.addChild(nickName);
            this.nickNameInput = nickName;
            nickName.addEventListener(egret.Event.CHANGE, this.checkNickName, this);

            // 用户名
            let tx2 = new egret.TextField();
            tx2.text = "请输入您的用户名：";
            tx2.x = 300;
            tx2.y = 310;
            tx2.width = 380;
            tx2.height = 50;
            tx2.size = 30;
            tx2.textColor = 0x000000;
            this.addChild(tx2);

            userName.x = 300;
            userName.y = 350;
            userName.width = 380;
            userName.height = 50;
            userName.size = 30;
            userName.verticalAlign = egret.VerticalAlign.MIDDLE;
            userName.type = egret.TextFieldType.INPUT;
            userName.inputType = egret.TextFieldInputType.TEXT;
            userName.border = true;
            userName.borderColor = 0x3333ff;
            this.addChild(userName);
            this.userNameInput = userName;
            userName.addEventListener(egret.Event.CHANGE, this.checkUserName, this);

            // 密码
            let tx3 = new egret.TextField();
            tx3.text = "请输入您的密码：";
            tx3.x = 300;
            tx3.y = 410;
            tx3.width = 380;
            tx3.height = 50;
            tx3.size = 30;
            tx3.textColor = 0x000000;
            this.addChild(tx3);

            password.x = 300;
            password.y = 450;
            password.width = 380;
            password.height = 50;
            password.size = 30;
            password.textColor = 0x00ff00;
            password.verticalAlign = egret.VerticalAlign.MIDDLE;
            password.type = egret.TextFieldType.INPUT;
            password.inputType = egret.TextFieldInputType.PASSWORD;
            password.border = true;
            password.borderColor = 0x3333ff;
            this.addChild(password);
            this.passwordInput = password;
            password.addEventListener(egret.Event.CHANGE, this.checkPassword, this);

            // 确认密码
            let tx4 = new egret.TextField();
            tx4.text = "请确认您的密码：";
            tx4.x = 300;
            tx4.y = 510;
            tx4.width = 380;
            tx4.height = 50;
            tx4.size = 30;
            tx4.textColor = 0x000000;
            this.addChild(tx4);

            passwordValidate.x = 300;
            passwordValidate.y = 550;
            passwordValidate.width = 380;
            passwordValidate.height = 50;
            passwordValidate.size = 30;
            passwordValidate.verticalAlign = egret.VerticalAlign.MIDDLE;
            passwordValidate.type = egret.TextFieldType.INPUT;
            passwordValidate.inputType = egret.TextFieldInputType.PASSWORD;
            passwordValidate.border = true;
            passwordValidate.borderColor = 0x3333ff;
            this.addChild(passwordValidate);
            this.passwordInputValidate = passwordValidate;
            passwordValidate.addEventListener(egret.Event.CHANGE, this.checkPasswordValidate, this);
            
            let bt = new eui.Button();
            RegisterUI.registerButton = bt;

            bt.label = '注册';     
            bt.horizontalCenter = 0;
            bt.verticalCenter = 0;
            bt.x = 270;
            bt.y = 650;
            bt.width = 430;
            bt.height = 100;
            this.addChild(RegisterUI.registerButton);
            /**
             * 修改按钮文本以及边框，并且要先添加到舞台
             */
            (<eui.Label>RegisterUI.registerButton.labelDisplay).size = 50;
            (<eui.Label>RegisterUI.registerButton.labelDisplay).textColor = 0xffffff;
            (<eui.Label>RegisterUI.registerButton.labelDisplay).textAlign = egret.HorizontalAlign.CENTER;
            (<eui.Label>RegisterUI.registerButton.labelDisplay).verticalCenter = egret.VerticalAlign.MIDDLE;
        }

        private checkNickName(){
            this.nickName = this.nickNameInput.text;
        }
        private checkUserName(){
            let userName = this.userNameInput.text;
            this.userName = userName;
            let userNameMessage = socketdata.SendXmlHelper.buildUserNameXml(userName);
            this.sendXmlToServer(userName);
            // 通过socket发送至服务器，然后判断是否存在
            if(this.isUsernameChecked){
                this.userNameInput.textColor = 0x00ff00;
            }
            else{
                this.userNameInput.textColor = 0xff0000;
            }
            // 确保用户名可用以及两次输入密码匹配，随后才可以进行注册
            if(this.isUsernameChecked && this.isPasswordChecked){
                this.isRegister = true;
            }
            else{
                this.isRegister = false;
            }
        }

        private isUserNameOK(success: string): boolean{
            if(success == '1'){
                return true;
            }
            return false;
        }
        private checkPassword(){
            let password = this.passwordInput.text;
            this.password = password;
            let passwordValidate = this.passwordInputValidate.text;
            if(password != passwordValidate){
                this.isPasswordChecked = false;
                this.passwordInputValidate.textColor = 0xff0000;
            }
            else{
                this.isPasswordChecked = true;
                this.passwordInputValidate.textColor = 0x00ff00;
            }
            // 可设置密码格式
        }
        private checkPasswordValidate(){
            // 验证密码的再次输入是否匹配
            let password = this.password;
            let passwordValidate = this.passwordInputValidate.text;
            if(password != passwordValidate){
                this.isPasswordChecked = false;
                this.passwordInputValidate.textColor = 0xff0000;
            }
            else{
                this.isPasswordChecked = true;
                this.passwordInputValidate.textColor = 0x00ff00;
            }
            // 确保用户名可用以及两次输入密码匹配，随后才可以进行注册
            if(this.isUsernameChecked && this.isPasswordChecked){
                this.isRegister = true;
            }
            else{
                this.isRegister = false;
            }
            if(!this.isRegister){
                if(!RegisterUI.registerButton.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
                    RegisterUI.registerButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.registerFailed, this);
                }
            }
            else{
                RegisterUI.registerButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.registerCheck, this);
            }
        }

        private registerCheck(){
            // 移除监听  

            // if(this.nickNameInput.hasEventListener(egret.Event.CHANGE)){
            //     this.nickNameInput.removeEventListener(egret.Event.CHANGE, this.checkNickName, this);
            // }
            // if(this.userNameInput.hasEventListener(egret.Event.CHANGE)){
            //     this.userNameInput.removeEventListener(egret.Event.CHANGE, this.checkUserName, this);
            // }
            // if(this.passwordInput.hasEventListener(egret.Event.CHANGE)){
            //     this.passwordInput.removeEventListener(egret.Event.CHANGE, this.checkPassword, this);
            // }
            // if(this.passwordInputValidate.hasEventListener(egret.Event.CHANGE)){
            //     this.passwordInputValidate.removeEventListener(egret.Event.CHANGE, this.checkPasswordValidate, this);
            // }

            // 将注册账号信息发送至服务器，随后存储在数据库中
            let nickName = this.nickName;
            let userName = this.userName;
            let password = this.password;
            let registerMessage: string = socketdata.SendXmlHelper.buildUserRegisterXml(nickName, userName, password);
            this.parent.removeChild(this);
        }
                // 服务器发送过来的数据
        private webSocketDataHandler(event: egret.ProgressEvent): void {
            let str: string = this.gameSocket.readUTF();
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
                if (tempList[0] == "RegisterUserNameSuccess") { // 如果是用户名的查重
                    this.isUsernameChecked = true;
                }
            }
        }
        //发送数据到服务器端
        private sendXmlToServer(xmlStr: string): void {
            if (this.gameSocket != null && this.gameSocket.connected == true) {
                // this.gameSocket.writeUTFBytes(xmlStr + "\n");
                this.gameSocket.writeUTF(xmlStr + "\n");
                this.gameSocket.flush();//对套接字输出缓冲区中积累的所有数据进行刷新
            }
            // console.log(this.gameSocket.connected);
        }
        public addBackforwardEventListener(eventName: string, eventFun: Function, eventObject: any){
                this.backforward.addEventListener(eventName, eventFun, eventObject);
        }

        // 无法注册时仍点击注册，按钮震动
        public registerFailed(){
            console.log(RegisterUI.registerButton);
            const offsetX: number = 10;
            const offsetY: number = 10;
            // 震动的持续时间
            const duration: number = 100;
            // 设置动画的属性和参数
            let tween = egret.Tween.get(RegisterUI.registerButton);
            tween.to({ x: RegisterUI.registerButton.x + offsetX, y: RegisterUI.registerButton.y + offsetY }, duration, egret.Ease.backInOut)
                .to({ x: RegisterUI.registerButton.x - offsetX, y: RegisterUI.registerButton.y - offsetY }, duration, egret.Ease.backInOut)
                .to({ x: RegisterUI.registerButton.x, y: RegisterUI.registerButton.y }, duration, egret.Ease.backInOut);

        }
    }
}