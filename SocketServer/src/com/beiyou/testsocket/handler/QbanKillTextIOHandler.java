package com.beiyou.testsocket.handler;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.List;

import org.apache.mina.core.buffer.IoBuffer;
import org.apache.mina.core.future.IoFutureListener;
import org.apache.mina.core.future.WriteFuture;
import org.apache.mina.core.service.IoHandlerAdapter;
import org.apache.mina.core.session.IdleStatus;
import org.apache.mina.core.session.IoSession;
import org.dom4j.Document;
import org.dom4j.io.SAXReader;

import com.beiyou.testsocket.common.xml.QbanKillTextSendXmlHelper;
import com.beiyou.testsocket.common.xml.QbanKillTextXmlHelper;
import com.beiyou.testsocket.entity.SnakeScore;
import com.beiyou.testsocket.entity.User;
import com.beiyou.testsocket.facade.SnakeScoreFacade;
import com.beiyou.testsocket.facade.UserFacade;
import com.beiyou.testsocket.websocket.WebSocketCodecPacket;

public class QbanKillTextIOHandler extends IoHandlerAdapter {
	
	public QbanKillTextIOHandler() {
		
	}
	
	// 接收请求信息
	public void messageReceived(IoSession session, Object message) throws Exception {	
		System.out.print("message accepted   ");
		// 测试：WebSocket
		boolean isRemoteWebSocket = session.containsAttribute("isWEB") && (true==(Boolean)session.getAttribute("isWEB"));
		// 解析接收消息
		String str = null;
        if(isRemoteWebSocket == false){// 普通socket，则可以直接读取数据
        	str = message.toString();
		}else{// 是websocket，则从IoBuffer中读取信息
			IoBuffer buffer = (IoBuffer)message;
			int bufferLength = buffer.limit();
	        byte[] b = new byte[bufferLength];
	        buffer.get(b);
	        str = new String(b, "utf-8");
		}
        System.out.println("str="+str);
        
		// 解析接收消息
//        String str = message.toString();
//		if (str == null || "".equals(str.trim()) == true || str.indexOf("</over>") < 0) {
        if (str == null || "".equals(str.trim()) == true){
			System.out.println("empty message   ");
			return;
		}
		if(str.indexOf("</over>") != -1){
			System.out.println("yyyyyyyy");
			str = str.replaceAll("\n", "");
			System.out.println(str);
			String[] temp = str.split("</over>");
			for(int i = 0; i < temp.length; i++){
				System.out.println(temp[i]);
				buildList(buildDoc(temp[i]), session);
			}
		}else{
			buildList(buildDoc(str), session);
		}
	}
	
	// 转doc
	public Document buildDoc(String str){
		Document doc = null;
		try {
			SAXReader saxReader = new SAXReader(false);
        	saxReader.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
        	saxReader.setFeature("http://xml.org/sax/features/external-general-entities", false);
        	saxReader.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
            InputStream inputStream = new ByteArrayInputStream(str.trim().getBytes("UTF-8"));
			doc = saxReader.read(inputStream);
			return doc;
		} catch (Exception ex) {
			System.out.println("analyse failed");
			return null;
		}
	}
	
	// 转list
	public void buildList(Document doc, IoSession session){
		List<String> list = QbanKillTextXmlHelper.gameDataHelper(doc);
		System.out.println("list=" + list);
		if(list != null){// 解析完毕，分发处理
			gameDateStreamHelper(list ,session);
		}else{
//			logger.info("丢弃包str="+str);
		}
	}
	
	
	private boolean sendMessageToAnotherClient(String xml, IoSession session) {
		// 向另外的客户端发送消息 只有一个
		IoSession otherSession = session.getService().getManagedSessions().values()
				.stream().filter(s -> !s.equals(session)).findFirst().orElse(null);
		
		// 广播消息给所有客户端
//        for (IoSession clientSession : session.getService().getManagedSessions().values()) {
//            if (clientSession != session) {
//                WriteFuture future = clientSession.write("Client " + session.getId() + ": " + msg);
//                future.awaitUninterruptibly();
//                if (!future.isWritten()) {
//                    System.err.println("Failed to deliver message to: " + clientSession.getRemoteAddress());
//                }
//            }
//        }
		
		if (otherSession != null) {
			IoBuffer Buffer = null;
			try {
				Buffer = IoBuffer.wrap((xml.toString()).getBytes("UTF-8"));
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			WriteFuture future = otherSession.write(WebSocketCodecPacket.buildPacket(Buffer));
			future.addListener(new IoFutureListener<WriteFuture>() {
                @Override
                public void operationComplete(WriteFuture future) {
                    if (future.isWritten()) {
                        System.out.println("消息发送成功");
                    } else {
                        System.out.println("消息发送失败：" + future.getException());
                    }
                }
            });
			
			return true;
		} else {
			// 如果没有向别的客户端发出消息，则认为客户端没有上线
			return false;
		}
	}
	//发送信息后调用的函数
	public void messageSent(IoSession session, Object message) throws Exception {
		
	}

	//处理未抛出的异常
	public void exceptionCaught(IoSession session, Throwable cause) throws Exception {
		try{
			session.close(true);
		}catch(Throwable ex){
			ex.printStackTrace();
		}
	}
	
	//连接超时
	public void sessionIdle(IoSession session, IdleStatus status) throws Exception {
		try{
			session.close(true);
		}catch(Throwable ex){
			ex.printStackTrace();
		}
	}
	
	//创建会话
	public void sessionCreated(IoSession session) throws Exception {
		System.out.println("=================创建会话====================");
//		session.setAttribute("userId", "0");
//		String ipAndPort = session.getRemoteAddress().toString();
//		session.setAttribute("ip",ipAndPort.subSequence(1,ipAndPort.indexOf(":")));
//		session.setAttribute("sessionId", "");
	}

	//连接打开调用的函数
	public void sessionOpened(IoSession session) throws Exception {
		
	}

	//连接关闭调用的函数
	public void sessionClosed(IoSession session) throws Exception {
		
	}
		
	// 处理登录操作
	private void getUserLoginInfo(String userName, String passWord, IoSession session){
		int success = 0;
		String tempXml = "";
		// 数据库操作
		
		UserFacade uFacade = new UserFacade();
		// 用户名是否存在
		User user = uFacade.getUserByName(userName);
		if(user == null){
			System.out.println("用户不存在");
		}else{
			String password = user.getPassword();
			if(passWord.equals(password)){
				success = 1;
				String nickname = user.getNickname();
				getLoginSuccessUserInfo(userName, nickname, session);
			}
		}
//		if(user == null){
//			System.out.println("登录失败");
//			success = 0;
//		}else{
//			String password = user.getPassword();
//			
//			if(passWord.equals(password)){
//				success = 1; // 登录成功
//				System.out.println("登录成功");
//			}else{
//				success = 0;
//			}
//		}
		
		System.out.println(success);
		tempXml = QbanKillTextSendXmlHelper.buildLoginSuccessXml(success);
		
		IoBuffer buffer = null;
		try {
			buffer = IoBuffer.wrap((tempXml.toString()).getBytes("UTF-8"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		session.write(WebSocketCodecPacket.buildPacket(buffer));
	}
//	 发送username并查询是否是否可用
	private void getRegisterUsernameInfo(String username, IoSession session){
		int success = 0;
		UserFacade uFacade = new UserFacade();
		// 用户名是否存在
		User user = uFacade.getUserByName(username);
		if(user == null){
			System.out.println("用户名可用");
			success = 1;
		}
		String tempXml = "";
		tempXml = QbanKillTextSendXmlHelper.buildRegisterUsernameSuccessXml(success);
		IoBuffer buffer = null;
		try {
			buffer = IoBuffer.wrap((tempXml.toString()).getBytes("UTF-8"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		session.write(WebSocketCodecPacket.buildPacket(buffer));
	}
	// 注册成功，传入数据库
	private void setRegisterInfo(String nickname, String username, String password, IoSession session){
//		int success = 0;
//		UserFacade uFacade = new UserFacade();
//		// 用户名是否存在
//		User user = uFacade.getUserByName(username);
//		if(user == null){
//			System.out.println("用户名可用");
//			success = 1;
//		}
//		String tempXml = "";
//		tempXml = QbanKillTextSendXmlHelper.buildRegisterUsernameSuccessXml(success);
//		IoBuffer buffer = null;
//		try {
//			buffer = IoBuffer.wrap((tempXml.toString()).getBytes("UTF-8"));
//		} catch (UnsupportedEncodingException e) {
//			e.printStackTrace();
//		}
//		session.write(WebSocketCodecPacket.buildPacket(buffer));
		
	}
	
	private void getLoginSuccessUserInfo(String username, String nickname, IoSession session){
		String tempXml = "";
		tempXml = QbanKillTextSendXmlHelper.buildLoginSuccessUserXml(username, nickname);
		if(sendMessageToAnotherClient(tempXml, session)){
			System.out.println("send userinfo success");
		}else{
			System.out.println("send userinfo failed");
		}
	}
	
	private void getSnakeMoveAngle(String angle, IoSession session){
		String tempXml = "";
		tempXml = QbanKillTextSendXmlHelper.buildSnakeMoveXml(angle);
//		System.out.println(tempXml);
		if(sendMessageToAnotherClient(tempXml, session)){
			System.out.println("send angle success");
		}else{
			System.out.println("send angle failed");
		}
	}
	
	private void getSnakeScore(String snakeName, String score, IoSession session){
		String tempXml = "";
		System.out.println(snakeName + score);
		SnakeScoreFacade ssFacade = new SnakeScoreFacade();
		
		SnakeScore ss = ssFacade.getSnakeByName(snakeName);
		int score_int = Integer.parseInt(score);
		if(ss == null){
			System.out.println("insert!");
			ssFacade.insertSnakeScoreByNameAndScore(snakeName, score_int);
		}else{
			System.out.println("update!");
			ssFacade.updateSnakeScoreByNameAndScore(snakeName, score_int);
		}
	}
	
	private void sendAllSnakeScore(){
		return;
	}
	/**
	 * 游戏数据解析器
	 * 如果是本类处理的数据,则本类处理,如果不是则转交相应类处理
	 */
	private void gameDateStreamHelper(List<String> list, IoSession session){
		if(list != null && list.size() > 0){
			System.out.println("list=" + list);
			String tempStr = String.valueOf(list.get(0));
			if("UserLogin".equals(tempStr) == true){// 取得所有房间详细信息请求
				getUserLoginInfo(list.get(1), list.get(2),  session);
			}
			else if("UserName".equals(tempStr) == true){
				getRegisterUsernameInfo(list.get(1), session);
			}
			else if("UserRegister".equals(tempStr) == true){
				;
			}
			else if("SnakeMove".equals(tempStr) == true){
				getSnakeMoveAngle(list.get(1), session);
			}
			else if("SnakeScore".equals(tempStr) == true){
				getSnakeScore(list.get(1), list.get(2), session);
			}
		}
	}
}
