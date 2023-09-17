package com.beiyou.testsocket.common.xml;

public class QbanKillTextSendXmlHelper {

	public QbanKillTextSendXmlHelper() {
		// TODO Auto-generated constructor stub
	}
	
	/*
	 * 字符串结束标志
	 */
	private static String lastStr = "</over>";
	
	
	/**
	 * 发送登录结果
	 * @param success
	 * @return String
	 */
	public static String buildLoginSuccessXml(int success){
		String xmlHead = "<LoginSuccess>";
		String xmlFoot = "</LoginSuccess>";
		StringBuffer result = new StringBuffer();
		result.append("<root>");
		result.append("<success>" + success+ "</success>");
		result.append("</root>");
		return xmlHead + result.toString() + xmlFoot+lastStr;
	}
	// 发送登录成功的用户信息，用于创建对应蛇
	public static String buildLoginSuccessUserXml(String username, String nickname){
		String xmlHead = "<LoginSuccessUser>";
		String xmlFoot = "</LoginSuccessUser>";
		StringBuffer result = new StringBuffer();
		result.append("<root>");
		result.append("<username>" + username + "</username>");
		result.append("<nickname>" + nickname + "</nickname>");
		result.append("</root>");
		return xmlHead + result.toString() + xmlFoot+lastStr;
	}
	
	// 是否注册成功
	public static String buildRegisterUsernameSuccessXml(int success){
		String xmlHead = "<RegisterUsernameSuccess>";
		String xmlFoot = "</RegisterUsernameSuccess>";
		StringBuffer result = new StringBuffer();
		result.append("<root>");
		result.append("<success>" + success + "</success>");
		result.append("</root>");
		return xmlHead + result.toString() + xmlFoot+lastStr;
	}
	
	// 是否注册成功
	public static String buildRegisterSuccessXml(int success){
		String xmlHead = "<RegisterSuccess>";
		String xmlFoot = "</RegisterSuccess>";
		StringBuffer result = new StringBuffer();
		result.append("<root>");
		result.append("<success>" + success + "</success>");
		result.append("</root>");
		return xmlHead + result.toString() + xmlFoot+lastStr;
	}
	
	public static String buildSnakeMoveXml(String angle){
		String xmlHead = "<SnakeMove>";
		String xmlFoot = "</SnakeMove>";
		StringBuffer result = new StringBuffer();
		result.append("<root>");
		result.append("<angle>" + angle + "</angle>");
//		result.append("<nickname>" + nickname + "</nickname>");
		result.append("</root>");
		return xmlHead + result.toString() + xmlFoot+lastStr;
	}
	
	public static String buildSnakeScoreXml(String snakeName, String score){
		String xmlHead = "<SnakeScore>";
		String xmlFoot = "</SnakeScore>";
		StringBuffer result = new StringBuffer();
		result.append("<root>");
		result.append("<snakeName>" + snakeName + "</snakeName>");
		result.append("<score>" + score + "</score>");
		result.append("</root>");
		return xmlHead + result.toString() + xmlFoot+lastStr;
	}
	
}
