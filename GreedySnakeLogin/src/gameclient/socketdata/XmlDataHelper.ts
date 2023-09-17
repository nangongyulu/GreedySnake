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

		//判断是否是返回登录字符串
		public static isLoginInfoXml(reXML_xml: egret.XML, str: string): Array<any> {
			let tempList: Array<any> = new Array<any>();
			let tempStr = "";
			tempList.push(str);
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
								if (twoNode.name == "success") {
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

		//做数据解析
		public static dateHelper(xmlStr: string): Array<any> {
			let tempList: Array<any> = null;
			
			let xml: egret.XML = egret.XML.parse(xmlStr);
			
			if (xml != null && xml != undefined) {
				let messageQuFen: string = xml.name;
				let hasChildNodesFlg: boolean = xml.children.length > 0 ? true : false;//是否有子节点
				if (hasChildNodesFlg) {
					if (messageQuFen == "LoginSuccess") {// 登录消息
						tempList = this.isLoginInfoXml(xml, "LoginSuccess");
					}
					else if(messageQuFen == "RegisterUsernameSuccess"){ // 用户名信息
						tempList = this.isLoginInfoXml(xml, "RegisterUsernameSuccess");
					}
				}
			}

			return tempList;
		}
	}
}
