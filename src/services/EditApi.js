import axios from "axios";

const editInvoiceData=async(docidArray,i_am,notes)=>{
    const editData={
        i_no:docidArray[0],
        i_am:i_am,
        notes:notes,
    }
    try{
        const API_URL=`http://localhost:8080/invoice_management_backend/EditData`;
        const res=await axios.post(API_URL,editData);
        console.log("response:",res);
    }
    catch(err){
        console.log("Error:",err);
    }
}

export default editInvoiceData;