import axios from "axios";

const addInvoiceData=async(c_name,c_no,i_no,i_am,due,notes)=>{
    const addData={
        c_name:c_name,
        c_no:c_no,
        i_no:i_no,
        i_am:i_am,
        due:due,
        notes:notes,
    }
    try{
        console.log(c_name);
        const API_URL=`http://localhost:8080/1804303/AddData`;
        const res=await axios.post(API_URL,addData);
        console.log("response:",res);
    }
    catch(err){
        console.log("Error:",err);
    }
}

export default addInvoiceData;
