import axios from "axios";
import {loadData,setPage} from "../actions/fetchaction";
import store from "../reducers/store.js";


const getInvoiceData=async(resPage)=>{
    try{
        const limit=20;
        const API_URL=`http://localhost:8080/invoice_management_backend/Fetchdata?offset=${resPage}&limit=${limit}`;
        const res=await axios.get(API_URL);
        store.dispatch(loadData(res.data));
        store.dispatch(setPage(limit));
    }
    catch(err){
        console.log("Error:",err);
    }
}

export default getInvoiceData;