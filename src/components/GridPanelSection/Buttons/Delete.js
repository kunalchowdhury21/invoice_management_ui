import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { DialogContent } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import DialogActions from '@material-ui/core/DialogActions';
import {makeStyles} from '@material-ui/core';
import {useSelector} from 'react-redux';
import deleteInvoiceData from "../../../services/DeleteApi.js";

const pixeltorem=px=>`${px/22.5}rem`;

const DeleteButtonandModal=makeStyles({
    grid_delete_button:{
        padding:"0.2rem",
        borderRadius:pixeltorem(10),
        height:pixeltorem(45),
        width:pixeltorem(123),
        color:"#FFFFFF",
        textTransform:'none',
        minWidth:"0.3rem",
        border:"0.08rem solid #14AFF1",
    },
    dialog:{
        "& .MuiPaper-rounded":{
            borderRadius:pixeltorem(10)
        },
    },
    dialogTitle:{
        minWidth:pixeltorem(611),
        height:pixeltorem(95),
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
        padding:pixeltorem(20),
        height:pixeltorem(152),
        backgroundColor:"#2A3E4C",
        border:"0.02rem solid #1f2e38",
        color:"#97A1A9",
    },
    dialogAction:{
        padding:pixeltorem(0),
        height:pixeltorem(95),
        backgroundColor:"#2A3E4C"
    },
    paddingCancelDelete:{
        paddingRight:pixeltorem(33)
    },
    paddingCancel:{
        paddingRight:pixeltorem(20)
    },
    cancelButton:{
        textTransform:"none",
        color:"#FFFFFF",
        height:pixeltorem(45),
        padding:pixeltorem(0),
        minWidth:pixeltorem(87),
        borderRadius:pixeltorem(10),
        border:"0.08rem solid #14AFF1"
    },
    deleteButton:{
        textTransform:"none",
        backgroundColor:"#14AFF1",
        color:"#FFFFFF",
        height:pixeltorem(45),
        padding:pixeltorem(0),
        minWidth:pixeltorem(77),
        borderRadius:pixeltorem(10),
        border:"none"
    },


})
const Delete=()=>
{   const classes=DeleteButtonandModal();

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
        if(enableDisable>0)
            return false
        else
            return true
    }


    const handleSubmit=()=>{
        deleteInvoiceData(docidArray);
    }
    return(
        <>
            <Button size="small" disabled={myFunction()} 
            className={classes.grid_delete_button} 
            style ={ (enableDisable>0)? { color:"#FFFFFF",border:"0.08rem solid #14AFF1" }:{ color:"#97A1A9",border:"0.08rem solid #97A1A9" }}
            variant="outlined" onClick={handleClickOpen}><RemoveIcon/>Delete
            </Button>
                    
                    <Dialog className={classes.dialog} maxWidth="false" onClose={handleClose} open={open}>
                        <form onSubmit={handleSubmit}>
                        <DialogTitle className={classes.dialogTitle}>
                            <div className={classes.cross}>
                               <l1>Delete Record(s)?</l1>
                               <l1><IconButton style={{padding:"0rem"}} onClick={handleClose}><CloseIcon style={{color:'white'}}/></IconButton></l1>
                            </div>
                        </DialogTitle>
                        <DialogContent className={classes.dialogContent}  dividers>
                            You'll loose your records after this action. We can't recover<br/>
                            them once you delete.<br/><br/>
                            Are you sure you want to <span style={{color:"red"}}>permanently delete</span> them?
                        </DialogContent>
                        <DialogActions className={classes.dialogAction}>
                        <div>
                            <l1 className={classes.paddingCancelDelete}>
                                <l1 className={classes.paddingCancel}>
                                    <Button className={classes.cancelButton} onClick={handleClose} autoFocus variant="outlined">Cancel</Button>
                                </l1>
                                <l1>
                                    <Button className={classes.deleteButton} type="submit" autoFocus variant="outlined" >Delete</Button>
                                </l1>
                            </l1>
                        </div>
                        </DialogActions>
                        </form>
                    </Dialog>
        </>
    );

}
export default Delete