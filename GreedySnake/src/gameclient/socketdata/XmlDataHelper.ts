//////////////////////////////////////////////////////////////////////////////////////
//
//  接收数据的解析器
//
//////////////////////////////////////////////////////////////////////////////////////
module gameclient.socketdata {
	export class XmlDataHelper {
		public constructor() {

		}

		//取得节点的值,<c/>这样的节点反回空串值
		private static getNodeValue(tempNode: egret.XML): string {
			let res: string = "";
			let noteValue: egret.XMLText = <egret.XMLText>tempNode.children[0];
			if (noteValue != null && noteValue != undefined) {//tempNode的下一个节点不等于空
				res = noteValue.text;//取得下一个节点的值
			}
			return res;
		}

		//判断是否是返回登录成功的用户信息字符串
		public static isLoginUserInfoXml(reXML_xml: egret.XML): Array<any> {
			let tempList: Array<any> = new Array<any>();
			let tempStr = "";
			tempList.push("LoginSuccessUser");
			let firstChild = reXML_xml.children;
			let sencondChild = null;
			let onetNode: egret.XML = null;
			let twoNode: egret.XML = null;
			for (let i = 0; i < firstChild.length; i++) {
				onetNode = <egret.XML>firstChild[i];
				if (onetNode != null && onetNode != undefined) {
					sencondChild = onetNode.children;
					if (sencondChild.length > 0) {
						for (let j = 0; j < sencondChild.length; j++) {
							twoNode = <egret.XML>sencondChild[j];
							if (twoNode != null && twoNode != undefined && twoNode.nodeType == 1) {
								if (twoNode.name == "nickname") {
									tempStr = this.getNodeValue(twoNode);
									tempList.push(tempStr);
								}
							}
						}
					}
				}
			}
			return tempList;
		}

		//判断是否是返回蛇移动字符串
		public static isSnakeMoveXml(reXML_xml: egret.XML): Array<any> {
			let tempList: Array<any> = new Array<any>();
			let tempStr = "";
			tempList.push("SnakeMove");
			let firstChild = reXML_xml.children;
			let sencondChild = null;
			let onetNode: egret.XML = null;
			let twoNode: egret.XML = null;
			for (let i = 0; i < firstChild.length; i++) {
				onetNode = <egret.XML>firstChild[i];
				if (onetNode != null && onetNode != undefined) {
					sencondChild = onetNode.children;
					if (sencondChild.length > 0) {
						for (let j = 0; j < sencondChild.length; j++) {
							twoNode = <egret.XML>sencondChild[j];
							if (twoNode != null && twoNode != undefined && twoNode.nodeType == 1) {
								if (twoNode.name == "angle") {
									tempStr = this.getNodeValue(twoNode);
									tempList.push(tempStr);
								}
								// else if(twoNode.name == "nickname"){
								// 	tempStr = this.getNodeValue(twoNode);
								// 	tempList.push(tempStr);
								// }
							}
						}
					}
				}
			}
			return tempList;
		}

		//做数据解析
		public static dateHelper(xmlStr: string): Array<any> {
			let tempList: Array<any> = null;
			
			let xml: egret.XML = egret.XML.parse(xmlStr);
			
			if (xml != null && xml != undefined) {
				let messageQuFen: string = xml.name;
				let hasChildNodesFlg: boolean = xml.children.length > 0 ? true : false;//是否有子节点
				if (hasChildNodesFlg) {
					if (messageQuFen == "LoginSuccessUser") {// 登录成功的用户信息
						tempList = this.isLoginUserInfoXml(xml);
					}
					else if(messageQuFen == "SnakeMove"){ // 蛇移动角度
						tempList = this.isSnakeMoveXml(xml);
					}
				}
			}

			return tempList;
		}
	}
}
