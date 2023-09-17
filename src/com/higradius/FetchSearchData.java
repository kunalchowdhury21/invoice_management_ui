package com.higradius;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

@WebServlet("/FetchSearchdata")
public class FetchSearchData extends HttpServlet{
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException
	{
		Connection conn = null;
		PreparedStatement pstmt = null;
		String url = "jdbc:mysql://localhost/h2h_internship";
		String userName = "root";
		String password = "root";
		try {
			String value=req.getParameter("value");
			int offset=Integer.parseInt(req.getParameter("offset"));
			int limit=Integer.parseInt(req.getParameter("limit"));
			
			System.out.println(value);
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection(url, userName, password);
			
			pstmt=conn.prepareStatement("SELECT name_customer, cust_number, doc_id, total_open_amount, due_in_date, notes FROM invoice_details WHERE doc_id LIKE ? LIMIT ?,?");
			pstmt.setString(1,value+'%');
			pstmt.setInt(2,offset);
			pstmt.setInt(3,limit);
			ResultSet rs=pstmt.executeQuery();
			
			ArrayList<RecordPojo> search_invoices=new ArrayList<RecordPojo>();
			
			while(rs.next()) {
				RecordPojo obj=new RecordPojo();
				obj.setName_customer(rs.getString("name_customer"));
				obj.setCust_number(rs.getString("cust_number"));
				obj.setDoc_id(rs.getLong("doc_id"));
				obj.setDue_in_date(rs.getString("due_in_date"));
				obj.setTotal_open_amount(rs.getDouble("total_open_amount"));
				obj.setNotes(rs.getString("notes"));
				search_invoices.add(obj);
			}
			Gson gson=new Gson();
			String data=gson.toJson(search_invoices);
			PrintWriter pt=res.getWriter();
			res.setContentType("application/json");
			res.setCharacterEncoding("UTF-8");
			pt.print(data);
			pt.flush();
		}
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
