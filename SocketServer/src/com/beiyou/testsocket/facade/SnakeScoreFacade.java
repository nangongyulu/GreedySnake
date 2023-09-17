package com.beiyou.testsocket.facade;

import java.util.HashMap;
import java.util.Map;

import com.beiyou.testsocket.dao.SnakeScoreDao;
import com.beiyou.testsocket.entity.SnakeScore;
import com.beiyou.testsocket.util.DAONameLink;
import com.ibatis.db.dao.DaoException;
import com.pwl.framework.db.ibatis.IbatisHelper;
import com.pwl.framework.exception.BaseException;
import com.pwl.framework.facade.BaseFacade;

public class SnakeScoreFacade extends BaseFacade{
	
	private SnakeScoreDao snakeScoreDao;
	
	public SnakeScoreFacade(){
		
		snakeScoreDao = (SnakeScoreDao) ((IbatisHelper) helper).getDao(DAONameLink.SNAKESCORE_DAO);
	}
	
	/**
	 * 通过id取得user表记录
	 * @param id
	 * @return
	 * @throws BaseException
	 */
	public SnakeScore getAllSnakeScore() throws BaseException{
		SnakeScore snakescore = null;
		try
		{	
			// 开始业务
			helper.beginTransaction();
			// 执行业务
			snakescore = snakeScoreDao.getAllSnakeScore();
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
		return snakescore;
	}
	public SnakeScore getSnakeByName(String name) throws BaseException
	{
		SnakeScore snakescore = null;
		try
		{	
			// 开始业务
			helper.beginTransaction();
			// 执行业务
			snakescore = snakeScoreDao.getSnakeByName(name);
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
		return snakescore;
	}

	public void insertSnakeScoreByNameAndScore(String snakeName, int score) throws BaseException
	{
//		Map<String, Object> params = new HashMap<>();
//		params.put("username", userName);
//		params.put("password", password);
//		SnakeScore snakescore = null;
		try
		{	
			// 开始业务
			helper.beginTransaction();
			// 执行业务
			snakeScoreDao.insertSnakeScoreByNameAndScore(snakeName, score);
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
//		return snakescore;
	}
	
	public void updateSnakeScoreByNameAndScore(String snakeName, int score) throws BaseException
	{
//		Map<String, Object> params = new HashMap<>();
//		params.put("username", userName);
//		params.put("password", password);
//		SnakeScore snakescore = null;
		try
		{	
			// 开始业务
			helper.beginTransaction();
			// 执行业务
			snakeScoreDao.updateSnakeScoreByNameAndScore(snakeName, score);
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
//		return snakescore;
	}
	
}
