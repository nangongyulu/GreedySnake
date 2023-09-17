package com.beiyou.testsocket.dao;

import java.util.HashMap;
import java.util.Map;

import com.beiyou.testsocket.entity.User;
import com.ibatis.db.dao.DaoException;
import com.pwl.framework.db.ibatis.dao.BaseDao;

public class UserDao extends BaseDao{
	
	public UserDao(){
		super();
	}
	
	// 用于注册时用户名查重
	public User getUserByName(String username)throws DaoException{
		return (User)this.executeQueryForObject("getUserByName", username);
	}
	
	// 用于登录确认
	public User getUserByNameAndPwl(String username, String password) throws DaoException{
		Map<String, Object> params = new HashMap<>();
		params.put("username", username);
		params.put("password", password);
		return (User)this.executeQueryForObject("getUserByNameAndPwl", params);
	}
	
	
}
