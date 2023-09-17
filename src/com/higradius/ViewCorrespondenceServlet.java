package com.higradius;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@WebServlet("/ViewCorrespondence")
public class ViewCorrespondenceServlet extends HttpServlet
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
		
		HashMap<String,String[]>data=new Gson().fromJson(param,new TypeToken<HashMap<String,String[]>>(){}.getType());
		System.out.println(data);
		
		try 
		{	Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection(url, userName, password);
			
			
			String sql="SELECT  doc_id,cust_number, posting_date, due_in_date,invoice_currency,total_open_amount FROM invoice_details WHERE doc_id=?";
			pstmt=conn.prepareStatement(sql);
			
			ArrayList<RecordPojo> view_invoices=new ArrayList<RecordPojo>();
			int count=0;
			for(String str:data.get("i_no"))
			{	if(count<50)
				{
					Long i_no=(long)Double.parseDouble(str);
					pstmt.setLong(1,i_no);
					ResultSet rs=pstmt.executeQuery();
					while(rs.next()) 
					{
						RecordPojo obj=new RecordPojo();
						obj.setDoc_id(rs.getLong("doc_id"));
						obj.setCust_number(rs.getString("cust_number"));
						obj.setPosting_date(rs.getString("posting_date"));
						obj.setDue_in_date(rs.getString("due_in_date"));
						obj.setInvoice_currency(rs.getString("invoice_currency"));
						obj.setTotal_open_amount(rs.getDouble("total_open_amount"));
						view_invoices.add(obj);
					}
					count++;
				}
				else 
				{
					break;
				}
			}
			Gson gson=new Gson();
			String final_data=gson.toJson(view_invoices);
			PrintWriter pt=res.getWriter();
			res.setContentType("application/json");
			res.setCharacterEncoding("UTF-8");
			pt.print(final_data);
			pt.flush();
			
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
