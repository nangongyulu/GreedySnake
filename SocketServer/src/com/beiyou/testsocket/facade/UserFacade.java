package com.beiyou.testsocket.facade;

import java.util.HashMap;
import java.util.Map;

import com.beiyou.testsocket.dao.UserDao;
import com.beiyou.testsocket.entity.User;
import com.beiyou.testsocket.util.DAONameLink;
import com.ibatis.db.dao.DaoException;
import com.pwl.framework.db.ibatis.IbatisHelper;
import com.pwl.framework.exception.BaseException;
import com.pwl.framework.facade.BaseFacade;

public class UserFacade extends BaseFacade{
	
	private UserDao userDao;
	
	public UserFacade(){
		
		userDao = (UserDao) ((IbatisHelper) helper).getDao(DAONameLink.USER_DAO);
	}
	
	/**
	 * 通过id取得user表记录
	 * @param id
	 * @return
	 * @throws BaseException
	 */
	public User getUserByName(String name) throws BaseException
	{
		User user = null;
		try
		{	
			// 开始业务
			helper.beginTransaction();
			// 执行业务
			user = userDao.getUserByName(name);
			// 提交任务
			helper.commit();
		} catch (DaoException ex)
		{
			helper.rollback();
			throw new BaseException(ex);
		}catch(Exception ex){
			helper.rollback();
			throw new BaseException(ex);
		}
		return user;
	}
	
	public User getUserByNameAndPwl(String userName, String password) throws BaseException
	{
		User user = null;
//		Map<String, Object> params = new HashMap<>();
//		params.put("username", userName);
//		params.put("password", password);
		try
		{	
			// 开始业务
			helper.beginTransaction();
			// 执行业务
			user = userDao.getUserByNameAndPwl(userName, password);
			// 提交任务
			helper.commit();
		} catch (DaoException ex)
		{
			helper.rollback();
			throw new BaseException(ex);
		}catch(Exception ex){
			helper.rollback();
			throw new BaseException(ex);
		}
		return user;
	}
	
//	public void setUserByName(String name, String pass) throws BaseException
//	{
//		try
//		{	
//			// 开始业务
//			helper.beginTransaction();
//			// 执行业务
//			userDao.setUserByName(name, pass);
//			System.out.print(pass);
//			// 提交任务
//			helper.commit();
//		} catch (DaoException ex)
//		{
//			helper.rollback();
//			throw new BaseException(ex);
//		}catch(Exception ex){
//			helper.rollback();
//			throw new BaseException(ex);
//		}
//	}
	
}
