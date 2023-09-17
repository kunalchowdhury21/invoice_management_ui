import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { DialogContent ,Input} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import {makeStyles} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import {useSelector} from 'react-redux';
import editInvoiceData from "../../../services/EditApi.js";

const pixeltorem=px=>`${px/22.5}rem`;

const EditButtonandModal=makeStyles({
    grid_edit_button:{
        padding:"0.2rem",
        borderRadius:pixeltorem(10),
        height:pixeltorem(45),
        width:pixeltorem(102),
        textTransform:'none',
        minWidth:"0.3rem",
    },
    dialog:{
        "& .MuiPaper-rounded":{
            borderRadius:pixeltorem(10)
        },
        "& .MuiDialogContent-root:first-child":{
            padding:pixeltorem(0)
        }
    },
    dialogTitle:{
        minWidth:pixeltorem(543),
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
        height:pixeltorem(328.42),
        backgroundColor:"#2A3E4C",
        border:"0.02rem solid #1f2e38",
        color:"#97A1A9",
    },
    dialogAction:{
        padding:pixeltorem(0),
        height:pixeltorem(91.58),
        backgroundColor:"#2A3E4C"
    },
    textField:{
        paddingRight:pixeltorem(30),
        paddingTop:pixeltorem(7),
        fontSize:pixeltorem(20)
    },
    inputfield:{
        padding:"0.1rem",
        "& .MuiInputBase-input":{
            padding:pixeltorem(5)
        },
        color:"#FFFFFF",
        border:"0.1rem solid #356680",
        borderRadius:pixeltorem(10),
        width:pixeltorem(300),
        height:pixeltorem(45),
        backgroundColor:"#283A46"
    },
    flexTextNInput:{
        display:"flex",
        justifyContent:"space-between",
        paddingTop:pixeltorem(17),
        paddingBottom:pixeltorem(20),
        paddingRight:pixeltorem(30),
        paddingLeft:pixeltorem(30)
    },
    notefield:{
        padding:"0.1rem",
        "& .MuiInputBase-input":{
            padding:pixeltorem(5)
        },
        color:"#FFFFFF",
        border:"0.1rem solid #356680",
        borderRadius:pixeltorem(10),
        width:pixeltorem(300),
        height:pixeltorem(208.5),
        backgroundColor:"#283A46",
    },
    cancelButton:{
        color:"#14AFF1",
        textTransform:"none",
        height:pixeltorem(23),
        padding:pixeltorem(0),
        minWidth:pixeltorem(60)
    },
    saveButton:{
        textTransform:"none",
        backgroundColor:"#14AFF1",
        color:"#FFFFFF",
        height:pixeltorem(45),
        padding:pixeltorem(0),
        minWidth:pixeltorem(77),
        borderRadius:pixeltorem(10),
        border:"none"
    },
    resetButton:{
        textTransform:"none",
        color:"#FFFFFF",
        height:pixeltorem(45),
        padding:pixeltorem(0),
        minWidth:pixeltorem(87),
        borderRadius:pixeltorem(10),
        border:"0.08rem solid #14AFF1"
    },
    paddingCancel:{
        paddingRight:pixeltorem(220)
    },
    paddingResetSave:{
        paddingRight:pixeltorem(33)
    },
    paddingReset:{
        paddingRight:pixeltorem(20)
    }

});

const Edit=()=>
{   const classes=EditButtonandModal();

    const docidArray=useSelector((stater)=>stater.docidArray);
    
    const enableDisable=useSelector((stater)=>stater.enableDisable);

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    const myFunction=()=>{
        if(enableDisable===1)
            return false
        else
            return true
    }

    const [i_am,setI_am]=useState("");
    const [notes,setNotes]=useState("");

    const handleInvoiceAmount=(event)=>{
        setI_am(event.target.value);
    }
    const handleNotes=(event)=>{
        setNotes(event.target.value);
    }

    const handleSubmit=()=>{
        editInvoiceData(docidArray,i_am,notes);
    }

    const handleReset = () => {
        setI_am("");
        setNotes("");
    };
    return(
        <>
            <Button size="small" disabled={myFunction()} 
            variant="outlined" className={classes.grid_edit_button}
            style ={ (enableDisable===1)? { color:"#FFFFFF",border:"0.08rem solid #14AFF1"}:{ color:"#97A1A9",border:"0.08rem solid #97A1A9" }} 
            onClick={handleClickOpen}><EditIcon/>Edit
            </Button>
                    
                    <Dialog className={classes.dialog} maxWidth="false" onClose={handleClose} open={open}>
                        <DialogTitle className={classes.dialogTitle}>
                            <div className={classes.cross}>
                               <l1>Edit Invoice</l1>
                               <l1><IconButton style={{padding:"0rem"}} onClick={handleClose}><CloseIcon style={{color:'white'}}/></IconButton></l1>
                           </div>
                        </DialogTitle>
                        <form onSubmit={handleSubmit}>
                        <DialogContent className={classes.dialogContent} dividers>
                        <div >
                            <div className={classes.flexTextNInput}>
                                <label className={classes.textField}>Invoice Amount</label>
                                <Input className={classes.inputfield} style={{padding:"0rem"}} type="text" disableUnderline={true} variant="outlined"
                                value={i_am}
                                onChange={handleInvoiceAmount}/>
                            </div>
                            <div className={classes.flexTextNInput}>
                                <label className={classes.textField}>Notes</label>
                                <Input className={classes.notefield} type="text" disableUnderline={true} variant="outlined"
                                value={notes}
                                onChange={handleNotes}/>
                            </div> 
                        </div>
                        </DialogContent>
                        <DialogActions className={classes.dialogAction}>
                            <div>
                                <l1 className={classes.paddingCancel}>
                                    <Button className={classes.cancelButton} onClick={handleClose}>Cancel</Button>
                                </l1>
                                <l1 className={classes.paddingResetSave}>
                                    <l1 className={classes.paddingReset}>
                                        <Button className={classes.resetButton} type="reset" autoFocus onClick={handleReset} variant="outlined">Reset</Button>
                                    </l1>
                                    <l1>
                                        <Button className={classes.saveButton} type="submit" autoFocus variant="outlined" >Save</Button>
                                    </l1>
                                </l1>

                            </div> 
                        </DialogActions>
                        </form>
                    </Dialog>
        </>
    );

}
export default Edit