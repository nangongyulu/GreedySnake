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
            // 构造用户名字符串，用于登录时检测用户名是否可用
            SendXmlHelper.buildUserNameXml = function (userName) {
                var res = "<UserName><root>"
                    + "<userName><![CDATA[" + userName + "]]></userName>"
                    + "</root></UserName>";
                return res;
            };
            // 构造登录字符串，用户名+密码
            SendXmlHelper.buildUserLoginXml = function (userName, pwl) {
                var res = "<UserLogin><root>"
                    + "<userName><![CDATA[" + userName + "]]></userName>"
                    + "<passWord><![CDATA[" + pwl + "]]></passWord>"
                    + "</root></UserLogin>";
                return res;
            };
            // 构造注册字符串，昵称+用户名+密码
            SendXmlHelper.buildUserRegisterXml = function (nickName, userName, pwl) {
                var res = "<UserRegister><root>"
                    + "<nickName><![CDATA[" + nickName + "]]></nickName>"
                    + "<userName><![CDATA[" + userName + "]]></userName>"
                    + "<passWord><![CDATA[" + pwl + "]]></passWord>"
                    + "</root></UserRegister>";
                return res;
            };
            // 构造移动字符串，移动角度，用于蛇移动
            SendXmlHelper.buildSnakeMoveXml = function (moveAngle) {
                var res = "<SnakeMove><root>"
                    + "<moveAngle><![CDATA[" + moveAngle + "]]></moveAngle>"
                    + "</root></SnakeMove>";
                return res;
            };
            return SendXmlHelper;
        }());
        socketdata.SendXmlHelper = SendXmlHelper;
        __reflect(SendXmlHelper.prototype, "gameclient.socketdata.SendXmlHelper");
    })(socketdata = gameclient.socketdata || (gameclient.socketdata = {}));
})(gameclient || (gameclient = {}));
//# sourceMappingURL=SendXmlHelper.js.map