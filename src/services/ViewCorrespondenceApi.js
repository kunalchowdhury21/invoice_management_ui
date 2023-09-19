import axios from "axios";
import {viewCorr} from "../actions/ViewCorrespondenceAction.js";
import store from "../reducers/store.js";

const ViewCorrespondanceFetch=async(docidArray)=>{
    const ViewCorrespondanceData={
        i_no:docidArray
    }
    try{
        const API_URL=`http://localhost:8080/invoice_management_backend/ViewCorrespondence`;
        const res=await axios.post(API_URL,ViewCorrespondanceData);
        store.dispatch(viewCorr(res.data));
    }
    catch(err){
        console.log("Error:",err);
    }
}

export default ViewCorrespondanceFetch;