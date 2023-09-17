package com.higradius;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@WebServlet("/EditData")
public class EditServlet extends HttpServlet
{	
	public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException
	{	
		Connection conn = null;
		PreparedStatement pstmt = null;
		String url = "jdbc:mysql://localhost/h2h_internship";
		String userName = "root";
		String password = "root";
		
		BufferedReader bufferReader=req.getReader();
		StringBuffer stringbufferReader=new StringBuffer();
		String line=bufferReader.readLine();
		
		while(line!=null) {
			stringbufferReader.append(line+"\n");
			line=bufferReader.readLine();
		}
		bufferReader.close();
		String param=stringbufferReader.toString();
		
		HashMap<String,String>data=new Gson().fromJson(param,new TypeToken<HashMap<String,String>>(){}.getType());
		System.out.println(data);
		
		Long doc_id=(long)Double.parseDouble(data.get("i_no"));
		Double i_am=Double.parseDouble(data.get("i_am"));
		String notes=data.get("notes");
		
		try 
		{	Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection(url, userName, password);
			
			
			String sql="UPDATE invoice_details SET notes=?, total_open_amount=? WHERE doc_id=?";
			pstmt=conn.prepareStatement(sql);
			
			pstmt.setString(1,notes);
			pstmt.setDouble(2,i_am);
			pstmt.setLong(3,doc_id);
			
			pstmt.executeUpdate();
			
			pstmt.close();
			conn.close();
			
		}//end of try block
		catch(Exception e) {
			e.printStackTrace();
		}
		finally{
			try{
				if(pstmt!=null)
					pstmt.close();
			}catch(SQLException se2){
			}// nothing we can do
			try{
				if(conn!=null)
					conn.close();
			}catch(SQLException se){
				se.printStackTrace();
			}
		}//end of finally block
	}
}
