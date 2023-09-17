import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector} from 'react-redux';
import {enableDisableAll,enableDisableSelected} from "../../../actions/buttonaction";
import getInvoiceData from "../../../services/FetchData";
import {setFlag} from "../../../actions/fetchaction.js";
import InfiniteScroll from "react-infinite-scroll-component";
import getSearchInvoiceData from "../../../services/FetchSearchData.js";
import {selectAllArray,selectiveArray} from "../../../actions/ArrayAction.js";
import {formatter,datformat} from "../../../utils/formatter";

const pixeltorem=px=>`${px/22.5}rem`;


const useStyles = makeStyles({
  tablecell:{
    color:"#FFFFFF",
    fontSize:pixeltorem(20),
    borderBottom:"none",
    height:pixeltorem(0),
  },
  tableheadercell:{
    backgroundColor:"#293f4d",
    borderBottom:"none",
    color:"#97A1A9",
  },
  tablecontainer:{
    backgroundColor:"#293f4d",
  },

});


export default function DenseTable(){
  const classes = useStyles();
  const dispatch=useDispatch();
  const resData=useSelector((state)=>state.fetchReducer.data);
  const resFlag=useSelector((state)=>state.fetchReducer.flag);
  const resPage=useSelector((state)=>state.fetchReducer.pageNo);
  const resSearchData=useSelector((state)=>state.fetchReducer.data1);
  const resSearchLength=useSelector((state)=>state.fetchReducer.searchBarLength);

  const resSearchBarData=useSelector((state)=>state.fetchReducer.searchData);
  const resSearchPage=useSelector((state)=>state.fetchReducer.pageNo1);

  useEffect(()=>{
    getInvoiceData(resPage);

    dispatch(setFlag(true));
    // fetchSearch();
  },[]);

  function fetchMoreData(){
    getInvoiceData(resPage);
  };

  function fetchMoreSearchData(){
    getSearchInvoiceData(resSearchBarData,resSearchPage);
  }

  window.onload=()=>{ 
    document.getElementById('select-all').onclick = function(){
    var checkboxes = document.querySelectorAll('input[name="individual-select"]');
    for (var checkbox of checkboxes) {
        checkbox.checked =this.checked;
    }
      dispatch(enableDisableAll(document.querySelectorAll('input[type="checkbox"]:checked').length));
      const array1=Array.from(document.querySelectorAll("input[name=individual-select]:checked")).map(e=>e.value);
      dispatch(selectAllArray(array1));
    }
  }
  
  const clickCounter=()=>{
    dispatch(enableDisableSelected(document.querySelectorAll('input[name="individual-select"]:checked').length));
    const array2=Array.from(document.querySelectorAll("input[name=individual-select]:checked")).map(e=>e.value);
    dispatch(selectiveArray(array2));
    changeChecked();
  }

  
  const changeChecked=()=>{
    if(resData.length===document.querySelectorAll('input[name=individual-select]:checked').length){
      document.getElementById("select-all").checked=true;
    }
    else{
      document.getElementById("select-all").checked=false;
    }
  }


  return (
    <TableContainer className={classes.tablecontainer} id="infinite-scroll" component={Paper}>
    
      
      <InfiniteScroll
        dataLength={(resSearchLength>0)?(resSearchData?.length):(resData?.length)}
        next={(resSearchLength>0)?(fetchMoreSearchData):(fetchMoreData)}
        hasMore={(resSearchLength>0)?(true):(resFlag)}
        scrollableTarget="infinite-scroll"
        height="30.5rem"
      >
      <Table  stickyHeader size="small" aria-label="a dense table" className={classes.table}>
        <TableHead className={classes.thead}>
          <TableRow className={classes.tablerowhead}>
            <TableCell className={classes.tableheadercell} align="center"><input style={{opacity:"0.5"}} type="checkbox" value={resData?.doc_id} id="select-all" color="primary"/></TableCell>
            <TableCell className={classes.tableheadercell} align="left">Customer Name</TableCell>
            <TableCell className={classes.tableheadercell} align="left">Customer #</TableCell>
            <TableCell className={classes.tableheadercell} align="left">Sales Order id #</TableCell>
            <TableCell className={classes.tableheadercell} align="right">Invoice Amount</TableCell>
            <TableCell className={classes.tableheadercell} align="right">Due Date</TableCell>
            <TableCell className={classes.tableheadercell} align="right">Predicted Payment Date</TableCell>
            <TableCell className={classes.tableheadercell} align="left">Predicted Aging Bucket</TableCell>
            <TableCell className={classes.tableheadercell} align="left">Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {((resSearchLength>0)?(resSearchData):(resData))?.map((data,index) => (
            <TableRow className={classes.tablerow} key={data.name} style ={ index % 2? { background : "#1c3344" }:{ background :"#293f4d" }}>
              <TableCell align="center" className={classes.tablecell}> 
                <input style={{opacity:"0.5"}} type="checkbox" name="individual-select" value={data.doc_id} onChange={changeChecked()} onClick={clickCounter} color="primary"/>
              </TableCell>

              <TableCell className={classes.tablecell} align="left">{data.name_customer}</TableCell>
              <TableCell className={classes.tablecell} align="left">{data.cust_number}</TableCell>
              <TableCell className={classes.tablecell} align="left">{data.doc_id}</TableCell>
              <TableCell className={classes.tablecell} align="right">{formatter(data.total_open_amount)}</TableCell>
              <TableCell className={classes.tablecell} align="right">{datformat(data.due_in_date)}</TableCell>
              <TableCell className={classes.tablecell} align="right">--</TableCell>
              <TableCell className={classes.tablecell} align="left">--</TableCell>
              <TableCell className={classes.tablecell} align="left">{data.notes}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
      </InfiniteScroll>
    </TableContainer>
  );
}
