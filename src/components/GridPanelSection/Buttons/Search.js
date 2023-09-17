import React, { useEffect, useState } from "react";
import {debounce, makeStyles} from '@material-ui/core';
import getSearchInvoiceData from "../../../services/FetchSearchData.js";
import { useDispatch, useSelector } from "react-redux";
import {searchBarLength} from "../../../actions/fetchaction.js";
import {searchData} from "../../../actions/fetchaction.js";
import store from "../../../reducers/store.js";
import {resetData} from "../../../actions/fetchaction.js";

const pixeltorem=px=>`${px/22.5}rem`;
const SearchButtonandModal=makeStyles({
    grid_search_button:{
        borderRadius:pixeltorem(10),
        height:pixeltorem(30),
        width:pixeltorem(340),
        color:"white",
        border:"0.08rem solid #356680",
        backgroundColor:"#283A46",
        padding:"0.2rem",
        minWidth:"0.3rem",
        fontSize:pixeltorem(18)
    }
})
const Search=()=>
{   const classes=SearchButtonandModal();

    const resSearchPage=useSelector((state)=>state.fetchReducer.pageNo1);

    const dispatch=useDispatch();

    const debounce=(fn,delay)=>{
        let timeoutid;
        return()=>{
            if(timeoutid)
                clearTimeout(timeoutid);
            timeoutid=setTimeout(()=>{
                fn();
            },delay);
        }
    }

    return(
        <>  
            <input type="text" autoComplete="off" id="search-input" 
            onInput={debounce(()=>{var x=document.getElementById("search-input").value;
            dispatch(searchData(x));
            console.log(resSearchPage);
            getSearchInvoiceData(x,resSearchPage);
            dispatch(searchBarLength(x.length))},2000)}
            className={classes.grid_search_button}/>
        </>
        );

}
export default Search