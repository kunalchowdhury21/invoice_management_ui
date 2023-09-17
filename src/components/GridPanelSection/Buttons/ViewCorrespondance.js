import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { DialogContent } from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import {useSelector} from 'react-redux';
import DialogActions from '@material-ui/core/DialogActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ViewCorrespondanceFetch from "../../../services/ViewCorrespondenceApi.js";
import {formatter,datformat} from "../../../utils/formatter";
import { jsPDF } from "jspdf";


const pixeltorem=px=>`${px/22.5}rem`;

const ViewButtonandModal=makeStyles({
    grid_view_button:{
        padding:"0.2rem",
        borderRadius:pixeltorem(10),
        height:pixeltorem(45),
        width:pixeltorem(237),
        textTransform:'none',
        minWidth:"0.3rem",
    },
    dialog:{
        "& .MuiPaper-rounded":{
            borderRadius:pixeltorem(10)
        }
    },
    dialogTitle:{
        minWidth:pixeltorem(1761),
        height:pixeltorem(91),
        paddingTop:pixeltorem(0),
        paddingBottom:pixeltorem(0),
        paddingLeft:pixeltorem(0),
        paddingRight:pixeltorem(0),
        backgroundColor:"#2A3E4C",
        color:"#FFFFFF"
    },
    cross:{
        display:"flex",
        justifyContent:"space-between",
        paddingTop:pixeltorem(24),
        paddingLeft:pixeltorem(30),
        paddingRight:pixeltorem(30)
    },
    dialogContent:{
        padding:pixeltorem(0),
        height:pixeltorem(570.5),
        backgroundColor:"#2A3E4C",
        border:"0.02rem solid #1f2e38",
        color:"#97A1A9"
    },
    paddingCancelDownload:{
        paddingRight:pixeltorem(33)
    },
    paddingCancel:{
        paddingRight:pixeltorem(20)
    },
    cancelButton:{
        textTransform:"none",
        color:"#14AFF1",
        height:pixeltorem(45),
        padding:pixeltorem(0),
        minWidth:pixeltorem(87),
        borderRadius:pixeltorem(10),
        border:"0.08rem"
    },
    downloadButton:{
        textTransform:"none",
        backgroundColor:"#14AFF1",
        color:"#FFFFFF",
        height:pixeltorem(45),
        padding:pixeltorem(0),
        minWidth:pixeltorem(132),
        borderRadius:pixeltorem(10),
        border:"none"
    },
    dialogAction:{
        padding:pixeltorem(0),
        height:pixeltorem(93.5),
        backgroundColor:"#2A3E4C"
    },
    div1:{
        height:pixeltorem(275),
        minWidth:pixeltorem(1672),
        paddingLeft:pixeltorem(30),
        paddingRight:pixeltorem(59),
        fontSize:pixeltorem(20)
    },
    div2:{
        height:pixeltorem(100),
        minWidth:pixeltorem(1672),
        paddingLeft:pixeltorem(30),
        paddingRight:pixeltorem(59),
        fontSize:pixeltorem(20),
        paddingTop:pixeltorem(30),

    },
    div3:{
        paddingLeft:pixeltorem(30),
        paddingRight:pixeltorem(56.69),
    },
    tabledhead:{
        backgroundColor:"#2A3E4C",
        fontSize:pixeltorem(18),
    },
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

})

const ViewCorrespondance=()=>
{   const classes=ViewButtonandModal();

    const enableDisable=useSelector((stater)=>stater.enableDisable);

    const [open, setOpen] = React.useState(false);

    const docidArray=useSelector((stater)=>stater.docidArray);

    const tabledata=useSelector((state)=>state.tabledata);

    const finaltabledata=tabledata.viewdata;
    console.log(finaltabledata.length);

    var sum = finaltabledata.reduce((prev, cur) => {
        return prev + cur.total_open_amount;
    }, 0);

    const handleClickOpen = () => {
        ViewCorrespondanceFetch(docidArray);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const myFunction=()=>{
        if(enableDisable>0)
            return false
        else
            return true
    }

    const handleSubmit=()=>{
        savePdf();
        setOpen(false);
    }


    const savePdf = () => {
        
        const str = window.document.getElementById("printid").innerText;
        const doc = new jsPDF('p','mm',[800,1000]);
        doc.text(str,10,10);
        doc.save("invoice");
    }
    
    
    

    return(
        <>
            <Button size="small" disabled={myFunction()} variant="outlined" 
            onClick={handleClickOpen} 
            style ={ (enableDisable>0)? { color:"#FFFFFF",border:"0.08rem solid #14AFF1" }:{ color:"#97A1A9",border:"0.08rem solid #97A1A9" }}
            className={classes.grid_view_button}>View Correspondance
            </Button>
                    
                    <Dialog onClose={handleClose} className={classes.dialog} maxWidth="false" open={open}>
                        <DialogTitle  className={classes.dialogTitle}>
                           <div className={classes.cross}>
                               <l1>View Correspondance</l1>
                               <l1><IconButton style={{padding:"0rem"}} onClick={handleClose}><CloseIcon style={{color:'white'}}/></IconButton></l1>
                           </div>
                        </DialogTitle>
                        <div id="printid">
                         <DialogContent className={classes.dialogContent} dividers >
                            <div className={classes.div1}>
                                Subject:<strong>Invoice Details -Account Name</strong> <br></br><br></br>Dear Sir/Madam,
                                <br></br><br></br>Greetings!<br></br><br></br>This is to remind you that there are one or more open invoices on your account. lease provide at your earliest convenience an update on the payment details or clarify the reason for the delay. If you have any specific issue with the invoice(s), please let us know so that we can address it to the correct Department.
                                <br></br><br></br>Please find the details of the invoices below:
                            </div>
                            <div className={classes.div3}>
                            <TableContainer elevation={"0rem"} component={Paper} className={classes.tablecontainer}>
                                <Table  size="small" aria-label="a dense table">
                                <TableHead className={classes.thead}>
                                    <TableRow className={classes.tabledhead}>
                                        <TableCell className={classes.tableheadercell} align="center">Sales Order id #</TableCell>
                                        <TableCell className={classes.tableheadercell} align="center">Customer #</TableCell>
                                        <TableCell className={classes.tableheadercell} align="center">Invoice Date</TableCell>
                                        <TableCell className={classes.tableheadercell} align="center">Due Date</TableCell>
                                        <TableCell className={classes.tableheadercell} align="center">Sales Order Currency</TableCell>
                                        <TableCell className={classes.tableheadercell} align="center">Open Amount</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {finaltabledata?.map((data,index) => (
                                    <TableRow key={data.name} style ={ index % 2? { background : "#1c3344" }:{ background :"#293f4d" }}>
                                        <TableCell className={classes.tablecell} align="center">{data.doc_id}</TableCell>
                                        <TableCell className={classes.tablecell} align="center">{data.cust_number}</TableCell>
                                        <TableCell className={classes.tablecell} align="center">{datformat(data.posting_date)}</TableCell>
                                        <TableCell className={classes.tablecell} align="center">{datformat(data.due_in_date)}</TableCell>
                                        <TableCell className={classes.tablecell} align="center">{data.invoice_currency}</TableCell>
                                        <TableCell className={classes.tablecell} align="center">{formatter(data.total_open_amount)}</TableCell>
                                </TableRow>
                                ))}
                                </TableBody>
                                </Table>
                             </TableContainer>
                             </div>
                             <div className={classes.div2}>
                             Total Amount to be Paid: <strong>${formatter(sum)}</strong><br></br><br></br>
                             In case you have already made a payment for the above items, please send us the details to ensure the payment is posted.<br></br>
                             Let us know if we can be of any further assistance. Looking forward to hearing from you.<br></br>
                             Kind Regards,<br></br><br></br><strong>Kunal Chowdhury<br></br>Phone :9957790331<br></br>Email :kunalchowdhury.12.kc@gmail.com<br></br>Company Name:Sales Order Management app,AI enabled,regression</strong>
                             </div> 
                            </DialogContent>
                            </div>
                            <DialogActions className={classes.dialogAction}>
                            <div>
                                <l1 className={classes.paddingCancelDownload}>
                                    <l1 className={classes.paddingCancel}>
                                        <Button className={classes.cancelButton} onClick={handleClose} autoFocus variant="outlined">Cancel</Button>
                                    </l1>
                                    <l1>
                                    <Button className={classes.downloadButton} type="submit" onClick={handleSubmit} autoFocus variant="outlined" >Download</Button>
                                </l1>
                            </l1>
                        </div>
                        </DialogActions>
                    </Dialog>
        </>
    );

}
export default ViewCorrespondance