import axios from "axios";

const deleteInvoiceData=async(docidArray)=>{
    const deleteData={
        i_no:docidArray,
    }
    try{
        const API_URL=`http://localhost:8080/1804303/DeleteData`;
        const res=await axios.post(API_URL,deleteData);
        console.log("response:",res);
    }
    catch(err){
        console.log("Error:",err);
    }
}

export default deleteInvoiceData;