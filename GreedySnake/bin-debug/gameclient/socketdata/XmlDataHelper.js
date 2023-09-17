var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//////////////////////////////////////////////////////////////////////////////////////
//
//  接收数据的解析器
//
//////////////////////////////////////////////////////////////////////////////////////
var gameclient;
(function (gameclient) {
    var socketdata;
    (function (socketdata) {
        var XmlDataHelper = (function () {
            function XmlDataHelper() {
            }
            //取得节点的值,<c/>这样的节点反回空串值
            XmlDataHelper.getNodeValue = function (tempNode) {
                var res = "";
                var noteValue = tempNode.children[0];
                if (noteValue != null && noteValue != undefined) {
                    res = noteValue.text; //取得下一个节点的值
                }
                return res;
            };
            //判断是否是返回登录成功的用户信息字符串
            XmlDataHelper.isLoginUserInfoXml = function (reXML_xml) {
                var tempList = new Array();
                var tempStr = "";
                tempList.push("LoginSuccessUser");
                var firstChild = reXML_xml.children;
                var sencondChild = null;
                var onetNode = null;
                var twoNode = null;
                for (var i = 0; i < firstChild.length; i++) {
                    onetNode = firstChild[i];
                    if (onetNode != null && onetNode != undefined) {
                        sencondChild = onetNode.children;
                        if (sencondChild.length > 0) {
                            for (var j = 0; j < sencondChild.length; j++) {
                                twoNode = sencondChild[j];
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
            };
            //判断是否是返回蛇移动字符串
            XmlDataHelper.isSnakeMoveXml = function (reXML_xml) {
                var tempList = new Array();
                var tempStr = "";
                tempList.push("SnakeMove");
                var firstChild = reXML_xml.children;
                var sencondChild = null;
                var onetNode = null;
                var twoNode = null;
                for (var i = 0; i < firstChild.length; i++) {
                    onetNode = firstChild[i];
                    if (onetNode != null && onetNode != undefined) {
                        sencondChild = onetNode.children;
                        if (sencondChild.length > 0) {
                            for (var j = 0; j < sencondChild.length; j++) {
                                twoNode = sencondChild[j];
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
            };
            //做数据解析
            XmlDataHelper.dateHelper = function (xmlStr) {
                var tempList = null;
                var xml = egret.XML.parse(xmlStr);
                if (xml != null && xml != undefined) {
                    var messageQuFen = xml.name;
                    var hasChildNodesFlg = xml.children.length > 0 ? true : false; //是否有子节点
                    if (hasChildNodesFlg) {
                        if (messageQuFen == "LoginSuccessUser") {
                            tempList = this.isLoginUserInfoXml(xml);
                        }
                        else if (messageQuFen == "SnakeMove") {
                            tempList = this.isSnakeMoveXml(xml);
                        }
                    }
                }
                return tempList;
            };
            return XmlDataHelper;
        }());
        socketdata.XmlDataHelper = XmlDataHelper;
        __reflect(XmlDataHelper.prototype, "gameclient.socketdata.XmlDataHelper");
    })(socketdata = gameclient.socketdata || (gameclient.socketdata = {}));
})(gameclient || (gameclient = {}));
//# sourceMappingURL=XmlDataHelper.js.map