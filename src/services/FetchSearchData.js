import axios from "axios";
import store from "../reducers/store.js";
import {loadSearchData,searchPage} from "../actions/fetchaction.js";

const getSearchInvoiceData=async(resSearchBarData,resSearchPage)=>{
    try{
        console.log(resSearchBarData);
        console.log(resSearchPage);
        const limit=20;
        const API_URL=`http://localhost:8080/invoice_management_backend/FetchSearchdata?value=${resSearchBarData}&offset=${resSearchPage}&limit=${limit}`;
        const res=await axios.get(API_URL);
        console.log(res.data);
        store.dispatch(loadSearchData(res.data));
        store.dispatch(searchPage(limit));
    }
    catch(err){
        console.log("Error:",err);
    }
}

export default getSearchInvoiceData;