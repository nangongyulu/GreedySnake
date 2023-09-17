package com.beiyou.testsocket.entity;

import java.io.Serializable;

public class SnakeScore implements Serializable{
	
	// 自增id, 蛇名，蛇得分
	private int id;
	private String snakename;
	private int score;
	
	public SnakeScore(){
		super();
	}
	
	public SnakeScore(String snakename, int score){
		super();
		this.snakename = snakename;
		this.score = score;
	}
	public int getId(){
		return id;
	}
	
	public void setId(int id){
		this.id = id;
	}
	
	public String getSnakename(){
		return snakename;
	}
	
	public void setSnakename(String snakename){
		this.snakename = snakename;
	}
	
	public int getScore(){
		return score;
	}
	
	public void setScore(int score){
		this.score = score;
	}
}
