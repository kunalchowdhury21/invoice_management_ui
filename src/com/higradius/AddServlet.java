package com.higradius;
import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@WebServlet("/AddData")
public class AddServlet extends HttpServlet
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
		
		String c_name=data.get("c_name");
		String c_no=data.get("c_no");
		Long doc_id=(long)Double.parseDouble(data.get("i_no"));
		Double i_am=Double.parseDouble(data.get("i_am"));
		String due_in_date=data.get("due");
		String notes=data.get("notes");
		
		try 
		{	Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection(url, userName, password);
			
			
			String sql="INSERT INTO invoice_details (name_customer,cust_number,doc_id,total_open_amount,due_in_date,notes) VALUES (?,?,?,?,?,?)";
			pstmt=conn.prepareStatement(sql);
			
			
			pstmt.setString(1,c_name);
			pstmt.setString(2,c_no);
			pstmt.setLong(3,doc_id);
			pstmt.setDouble(4,i_am);
			pstmt.setString(5, due_in_date);
			pstmt.setString(6,notes);
			
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
