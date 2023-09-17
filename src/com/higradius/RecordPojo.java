package com.higradius;
//Pojo Class
public class RecordPojo
{
	private String cust_number;
	private String name_customer;
	private Long doc_id;
	private String due_in_date;
	private Double total_open_amount;
	private String notes;
	private String posting_date;
	private String invoice_currency;

	//cust_number
	public String getCust_number() {
		return cust_number;
	}
	public void setCust_number(String cust_number) {
		this.cust_number = cust_number;
	}
	
	//name_customer
	public String getName_customer() {
		return name_customer;
	}
	public void setName_customer(String name_customer) {
		this.name_customer = name_customer;
	}

	//doc_id
	public Long getDoc_id() {
		return doc_id;
	}
	public void setDoc_id(Long doc_id) {
		this.doc_id=doc_id;
	}

	//due_in_date
	public String getDue_in_date() {
		return due_in_date;
	}
	public void setDue_in_date(String due_in_date)
	{	this.due_in_date=due_in_date;
	}
	
	//posting_date
	public String getPosting_date() {
		return posting_date;
	}
	public void setPosting_date(String posting_date)
	{	this.posting_date=posting_date;
	}
	
	//invoice_currency
	public String getInvoice_currency() {
		return invoice_currency;
	}
	public void setInvoice_currency(String invoice_currency) {
		this.invoice_currency = invoice_currency;
	}

	//total_open_amount
	public Double getTotal_open_amount() {
		return total_open_amount;
	}
	public void setTotal_open_amount(Double total_open_amount) {
		this.total_open_amount=total_open_amount;
	}
	
	//notes
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes=notes;
	}
	

}