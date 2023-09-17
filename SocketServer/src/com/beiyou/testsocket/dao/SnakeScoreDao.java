package com.beiyou.testsocket.dao;

import java.util.HashMap;
import java.util.Map;

import com.beiyou.testsocket.entity.SnakeScore;
import com.ibatis.db.dao.DaoException;
import com.pwl.framework.db.ibatis.dao.BaseDao;

public class SnakeScoreDao extends BaseDao{
	
	public SnakeScoreDao(){
		super();
	}
	
	// 用于前端展示蛇得分
	public SnakeScore getAllSnakeScore() throws DaoException{
		return (SnakeScore)this.executeQueryForObject("getAllSnakeScore", null);
	}
	
	// 用于查找蛇
	public SnakeScore getSnakeByName(String snakename)throws DaoException{
		return (SnakeScore)this.executeQueryForObject("getSnakeByName", snakename);
	}
	
	// 用于插入信息
	public void insertSnakeScoreByNameAndScore(String snakename, int score) throws DaoException{
//		Map<String, Object> params = new HashMap<>();
//		params.put("snakename", snakename);
//		params.put("score", score);
//		return (SnakeScore)this.executeQueryForObject("insertSnakeScoreByNameAndScore", params);
		SnakeScore temp = new SnakeScore(snakename, score);
		this.executeUpdate("insertSnakeScoreByNameAndScore", temp);
	}
	
	// 用于更新信息
	public void updateSnakeScoreByNameAndScore(String snakename, int score) throws DaoException{
//		Map<String, Object> params = new HashMap<>();
//		params.put("snakename", snakename);
//		params.put("score", score);
//		return (SnakeScore)this.executeQueryForObject("updateSnakeScoreByNameAndScore", params);
		SnakeScore temp = new SnakeScore(snakename, score);
		this.executeUpdate("updateSnakeScoreByNameAndScore", temp);
	}
}
