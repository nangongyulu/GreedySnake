package com.beiyou.testsocket.action;


import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.beiyou.testsocket.facade.UserFacade;
import com.beiyou.testsocket.entity.User;
import com.google.gson.Gson;
import com.pwl.framework.action.BaseAction;
import com.pwl.framework.exception.BaseException;

public class GetUserLoginAction extends BaseAction {

	@Override
	public ActionForward process(ActionMapping arg0, ActionForm arg1, HttpServletRequest arg2, HttpServletResponse arg3)
			throws BaseException {
//		arg3.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
//		arg3.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5665");
//
//		
//		String userName = arg2.getParameter("userName");
//		String password = arg2.getParameter("password");
//
//		arg3.setContentType("application/json");
//		
//
//		
//
//		System.out.println("username=" + userName);
//		System.out.println("password=" + password);
//		UserFacade uFacade = new UserFacade();
//		arg3.setCharacterEncoding("utf-8");
//		
//		User user = uFacade.getUserByNameAndPwl(userName, password);
//		
//		try {
//			// ����Ҫ���ص� JSON ����
//	        Gson gson = new Gson();
//	        Map<String, Object> map = new HashMap<>();
//			if (user == null) {
//				map.put("isExists", false);
//			} else {
//				map.put("isExists", true);
//			}
//			map.put("user", user);
//			String gsondata = gson.toJson(map);
//			arg3.getWriter().write(gsondata);
//		} catch (Exception e) {
//	        // �����쳣
//	        e.printStackTrace();
//	    }

		

	    
		return null;
	}
	
	
}
