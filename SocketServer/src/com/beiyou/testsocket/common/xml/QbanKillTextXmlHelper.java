package com.beiyou.testsocket.common.xml;

import java.util.ArrayList;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.Element;

public class QbanKillTextXmlHelper {

	public QbanKillTextXmlHelper() {
		// TODO Auto-generated constructor stub
	}
	
	/**
	 * 数据请求
	 * @param doc
	 * @return
	 */
	private static List<String> isDataXml(Document doc){
		List<String> list = null;
		try{
            Element rootElement = doc.getRootElement();
            List children = rootElement.elements();
            list = new ArrayList<String>();
			if ("UserLogin".equals(rootElement.getName()) == true) {
				list.add("UserLogin");
				int size = children.size();
				
				for (int i = 0; i < size; i++) {
					Element child = (Element) children.get(i);
					list.add(child.element("userName").getText());
					list.add(child.element("passWord").getText());
				}
			}
			else if("UserName".equals(rootElement.getName()) == true){
				list.add("UserName");
				Element child = (Element)children.get(0);
				list.add(child.element("userName").getText());
			}
			else if("UserRegister".equals(rootElement.getName()) == true){
				list.add("UserRegister");
				int size = children.size();
				
				for (int i = 0; i < size; i++) {
					Element child = (Element) children.get(i);
					list.add(child.element("nickName").getText());
					list.add(child.element("userName").getText());
					list.add(child.element("passWord").getText());
				};
			}
			else if("SnakeMove".equals(rootElement.getName()) == true){
				list.add("SnakeMove");
				Element child = (Element)children.get(0);
				list.add(child.element("moveAngle").getText());
			}
			else if("SnakeScore".equals(rootElement.getName()) == true){
				list.add("SnakeScore");
				int size = children.size();
				
				for (int i = 0; i < size; i++) {
					Element child = (Element) children.get(i);
					list.add(child.element("snakeName").getText());
					list.add(child.element("score").getText());
				}
			}
        } catch (Exception ex){
            list = null;
        }
		return list;
	}
	
	/**
	 * 数据解析处理
	 * @param doc
	 * @return List<String>
	 */
	public static List<String> gameDataHelper(Document doc){
		List<String> list = null;
		
		list = isDataXml(doc);
		System.out.println(list);
		if(list != null && list.size() > 0){
			return list;
		}
		
		return null;
	}

}
