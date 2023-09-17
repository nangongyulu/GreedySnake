package com.beiyou.testsocket.entity;

import java.io.Serializable;

public class User implements Serializable{
	
	// 自增id, 用户名，密码，昵称
	private int id;
	private String username;
	private String password;
	private String nickname;
//	private int score;
	
	public User(){
		super();
	}
	
	public int getId(){
		return id;
	}
	
	public void setId(int id){
		this.id = id;
	}
	
	public String getUsername(){
		return username;
	}
	
	public void setUsername(String username){
		this.username = username;
	}
	
	public String getPassword(){
		return password;
	}
	
	public void setPassword(String password){
		this.password = password;
	}
	
	public String getNickname(){
		return nickname;
	}
	
	public void setNickname(String nickname){
		this.nickname = nickname;
	}
	
//	public int getScore(){
//		return score;
//	}
//	
//	public void setScore(int score){
//		this.score = score;
//	}
}
