var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//////////////////////////////////////////////////////////////////////////////////////
//
//  发送数据的构造器
//
//////////////////////////////////////////////////////////////////////////////////////
var gameclient;
(function (gameclient) {
    var socketdata;
    (function (socketdata) {
        var SendXmlHelper = (function () {
            function SendXmlHelper() {
            }
            // 构造登录字符串
            SendXmlHelper.buildUserLoginXml = function (userName, pwl) {
                var res = "<UserLogin><root>"
                    + "<userName><![CDATA[" + userName + "]]></userName>"
                    + "<passWord><![CDATA[" + pwl + "]]></passWord>"
                    + "</root></UserLogin>";
                return res;
            };
            // 构造得分字符串
            SendXmlHelper.buildSnakeScoreXml = function (snakeName, score) {
                var res = "<SnakeScore><root>"
                    + "<snakeName><![CDATA[" + snakeName + "]]></snakeName>"
                    + "<score><![CDATA[" + score + "]]></score>"
                    + "</root></SnakeScore>"
                    + "</over>";
                return res;
            };
            return SendXmlHelper;
        }());
        socketdata.SendXmlHelper = SendXmlHelper;
        __reflect(SendXmlHelper.prototype, "gameclient.socketdata.SendXmlHelper");
    })(socketdata = gameclient.socketdata || (gameclient.socketdata = {}));
})(gameclient || (gameclient = {}));
//# sourceMappingURL=SendXmlHelper.js.map