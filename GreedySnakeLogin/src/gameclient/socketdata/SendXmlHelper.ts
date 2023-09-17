//////////////////////////////////////////////////////////////////////////////////////
//
//  发送数据的构造器
//
//////////////////////////////////////////////////////////////////////////////////////
module gameclient.socketdata {
	export class SendXmlHelper {
		public constructor() {

		}

		// 构造用户名字符串，用于登录时检测用户名是否可用
		public static buildUserNameXml(userName: string): string {
			let res: string = "<UserName><root>"
				+ "<userName><![CDATA[" + userName + "]]></userName>"
				+ "</root></UserName>";
			return res;
		}

		// 构造登录字符串，用户名+密码
		public static buildUserLoginXml(userName: string, pwl: string): string {
			let res: string = "<UserLogin><root>"
				+ "<userName><![CDATA[" + userName + "]]></userName>"
				+ "<passWord><![CDATA[" + pwl + "]]></passWord>"
				+ "</root></UserLogin>";
			return res;
		}

		// 构造注册字符串，昵称+用户名+密码
		public static buildUserRegisterXml(nickName: string, userName: string, pwl: string){
			let res: string = "<UserRegister><root>"
				+ "<nickName><![CDATA[" + nickName + "]]></nickName>"
				+ "<userName><![CDATA[" + userName + "]]></userName>"
				+ "<passWord><![CDATA[" + pwl + "]]></passWord>"
				+ "</root></UserRegister>";
			return res;
		}

		// 构造移动字符串，移动角度，用于蛇移动
		public static buildSnakeMoveXml(moveAngle: number): string {
			let res: string = "<SnakeMove><root>"
				+ "<moveAngle><![CDATA[" + moveAngle + "]]></moveAngle>"
				+ "</root></SnakeMove>";
			return res;
		}
		// 构造得分字符串

		// 构造记录字符串，游戏开始时间+用户uid+游戏结束时间
	}
}
