//////////////////////////////////////////////////////////////////////////////////////
//
//  发送数据的构造器
//
//////////////////////////////////////////////////////////////////////////////////////
module gameclient.socketdata {
	export class SendXmlHelper {
		public constructor() {

		}

		// 构造登录字符串
		public static buildUserLoginXml(userName: string, pwl: string): string {
			let res: string = "<UserLogin><root>"
				+ "<userName><![CDATA[" + userName + "]]></userName>"
				+ "<passWord><![CDATA[" + pwl + "]]></passWord>"
				+ "</root></UserLogin>";
			return res;
		}

		// 构造得分字符串
		public static buildSnakeScoreXml(snakeName: string, score: number): string {
			let res: string = "<SnakeScore><root>"
				+ "<snakeName><![CDATA[" + snakeName + "]]></snakeName>"
				+ "<score><![CDATA[" + score + "]]></score>"
				+ "</root></SnakeScore>"
				+ "</over>";
			return res;
		}
	}
}
