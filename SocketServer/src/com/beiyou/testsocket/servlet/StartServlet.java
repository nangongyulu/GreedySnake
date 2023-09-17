package com.beiyou.testsocket.servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import com.beiyou.testsocket.main.QbanKillTextServerMain;

public class StartServlet extends HttpServlet {

	public StartServlet() {
		super();
	}
	
	/**
	 * 初始化方法
	 */
	public void init() throws ServletException {
		QbanKillTextServerMain.main(null);
	}
	
 	public void destroy(){
 		super.destroy();
 	}
}
