import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme, DialogContent, Input, makeStyles,Snackbar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DialogActions from '@material-ui/core/DialogActions';
import React, { useState } from "react";
import {useSelector} from "react-redux";
import addInvoiceData from "../../../services/AddApi.js";

const pixeltorem=px=>`${px/22.5}rem`;

const theme=createMuiTheme({
    palette:{
        action:{
            disabledBackground:"red",
            disabled:"red"
        }
    }
})
const AddButtonandModal=makeStyles({
    grid_add_button:{
        padding:"0.2rem",
        borderRadius:pixeltorem(10),
        height:pixeltorem(45),
        width:pixeltorem(106),
        color:"#FFFFFF",
        textTransform:'none',
        minWidth:"0.3rem",
        border:"0.08rem solid #14AFF1",
        
    },
    dialog:{
        "& .MuiPaper-rounded":{
            borderRadius:pixeltorem(10)
        }
    },
    dialogTitle:{
        minWidth:pixeltorem(1106),
        height:pixeltorem(91),
        paddingTop:pixeltorem(0),
        paddingBottom:pixeltorem(0),
        paddingLeft:pixeltorem(0),
        paddingRight:pixeltorem(0),
        backgroundColor:"#2A3E4C",
        color:"#FFFFFF"
    },
    dialogContent:{
        padding:pixeltorem(0),
        height:pixeltorem(326.42),
        backgroundColor:"#2A3E4C",
        border:"0.02rem solid #1f2e38",
        color:"#97A1A9"
    },
    dialogAction:{
        padding:pixeltorem(0),
        height:pixeltorem(91.58),
        backgroundColor:"#2A3E4C"
    },
    cross:{
        display:"flex",
        justifyContent:"space-between",
        paddingTop:pixeltorem(24),
        paddingLeft:pixeltorem(30),
        paddingRight:pixeltorem(30)
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
    textField:{
        paddingRight:pixeltorem(30),
        paddingTop:pixeltorem(7),
        fontSize:pixeltorem(20)
    },
    flexdivs:{
        display:"flex",
        justifyContent:"space-between"
    },
    flexTextNInput:{
        display:"flex",
        justifyContent:"space-between",
        paddingTop:pixeltorem(15),
        paddingBottom:pixeltorem(20),
        paddingRight:pixeltorem(30),
        paddingLeft:pixeltorem(30)
    },
    cancelButton:{
        color:"#14AFF1",
        textTransform:"none",
        height:pixeltorem(23),
        padding:pixeltorem(0),
        minWidth:pixeltorem(60)
    },
    addButton:{
        textTransform:"none",
        backgroundColor:"#14AFF1",
        color:"#FFFFFF",
        height:pixeltorem(45),
        padding:pixeltorem(0),
        minWidth:pixeltorem(77),
        borderRadius:pixeltorem(10),
        border:"none"
    },
    clearButton:{
        textTransform:"none",
        color:"#FFFFFF",
        height:pixeltorem(45),
        padding:pixeltorem(0),
        minWidth:pixeltorem(87),
        borderRadius:pixeltorem(10),
        border:"0.08rem solid #14AFF1"
    },
    paddingCancel:{
        paddingRight:pixeltorem(775)
    },
    paddingClearAdd:{
        paddingRight:pixeltorem(33)
    },
    paddingClear:{
        paddingRight:pixeltorem(20)
    }
});

const Add=()=>
{   const classes=AddButtonandModal();
    
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
            return true
        else
            return false
    }



    const [c_name,setC_name]=useState("");
    const [c_no,setC_no]=useState("");
    const [i_no,setI_no]=useState("");
    const [i_am,setI_am]=useState("");
    const [due,setDue]=useState("");
    const [notes,setNotes]=useState("");

    const handleCustomerName=(event)=>{
        setC_name(event.target.value);
    }
    const handleCustomerNo=(event)=>{
        setC_no(event.target.value);
    }
    const handleInvoiceNo=(event)=>{
        setI_no(event.target.value);
    } 
    const handleInvoiceAmount=(event)=>{
        setI_am(event.target.value);
    }
    const handleDueinDate=(event)=>{
        setDue(event.target.value);
    }
    const handleNotes=(event)=>{
        setNotes(event.target.value);
    }

    const handleSubmit=()=>{
        setState({...state, openis: false});
        
        addInvoiceData(c_name,c_no,i_no,i_am,due,notes)
    }

    const handleReset = () => {
        setC_name("");
        setC_no("");
        setI_no("");
        setI_am("");
        setDue("");
        setNotes("")
    };

    //positioned Snackbar
    const [state, setState] = React.useState({
        openis: false,
        vertical: 'top',
        horizontal: 'center',
      });

    const { vertical, horizontal, openis } = state;

    const handleClick = (newState) => () => {
        setState({ openis: true, ...newState });
    };

    const handleClosing = () => {
        setState({ ...state, openis: false });
    };

    return(
        <>
                <Button disabled={myFunction()} size="small" variant="outlined" 
                 style ={ (enableDisable>0)? { color:"#97A1A9",border:"0.08rem solid #97A1A9" }:{ color:"#FFFFFF",border:"0.08rem solid #14AFF1" }}
                onClick={handleClickOpen}  className={classes.grid_add_button}><AddIcon/>Add
                </Button>
                    
                    <Dialog className={classes.dialog} maxWidth="false" onClose={handleClose} open={open}> 
                        
                        <form onSubmit={handleSubmit}>
                        <DialogTitle  className={classes.dialogTitle}>
                           <div className={classes.cross}>
                               <l1>Add Invoice</l1>
                               <l1><IconButton style={{padding:"0rem"}} onClick={handleClose}><CloseIcon style={{color:'white'}}/></IconButton></l1>
                           </div>
                        </DialogTitle>
                        
                        <DialogContent className={classes.dialogContent} dividers>
                        <div className={classes.flexdivs}>   
                            <div>
                                <div className={classes.flexTextNInput}>
                                    <label className={classes.textField}>Customer Name <span style={{color:"red"}}> *</span></label>
                                    <Input className={classes.inputfield} 
                                        style={{padding:"0rem"}} type="text" disableUnderline={true} variant="outlined" required
                                        value={c_name}
                                        onChange={handleCustomerName}/>
                                </div>
                                <div className={classes.flexTextNInput}>
                                    <label className={classes.textField}>Customer No. <span style={{color:"red"}}> *</span></label>
                                    <Input className={classes.inputfield} type="text" disableUnderline={true} variant="outlined" required
                                        value={c_no}
                                        onChange={handleCustomerNo}/>
                                </div>
                                <div className={classes.flexTextNInput}>
                                    <label className={classes.textField}>Invoice No. <span style={{color:"red"}}> *</span></label>
                                    <Input className={classes.inputfield} type="text" disableUnderline={true} variant="outlined" required
                                    value={i_no}
                                    onChange={handleInvoiceNo}/>
                                </div>
                                <div  className={classes.flexTextNInput}>
                                    <label className={classes.textField}>Invoice Amount <span style={{color:"red"}}> *</span></label>
                                    <Input className={classes.inputfield} type="text" disableUnderline={true} variant="outlined" required
                                    value={i_am}
                                    onChange={handleInvoiceAmount}/>
                                </div>
                            </div>
                            <div>
                                <div className={classes.flexTextNInput}>
                                    <label className={classes.textField}>Due Date <span style={{color:"red"}}> *</span></label>
                                    <Input className={classes.inputfield} style={{padding:"0rem"}} type="date" disableUnderline={true} variant="outlined" required
                                    value={due}
                                    onChange={handleDueinDate}/>
                                </div>
                                <div className={classes.flexTextNInput}>
                                    <label className={classes.textField}>Notes</label>
                                    <Input className={classes.notefield} fullWidth={true} type="text" disableUnderline={true} variant="outlined"
                                    value={notes}
                                    onChange={handleNotes}/>
                                </div>
                            </div>
                        </div>
                        </DialogContent>
                        
                        
                        <DialogActions className={classes.dialogAction}>
                        <div>
                            <l1 className={classes.paddingCancel}>
                                <Button className={classes.cancelButton} onClick={handleClose}><strong>Cancel</strong></Button>
                            </l1>
                            <l1 className={classes.paddingClearAdd}>
                                <l1 className={classes.paddingClear}>
                                    <Button className={classes.clearButton} onClick={handleReset} type="reset" autoFocus variant="outlined"><strong>Clear</strong></Button>
                                </l1>
                                <l1>
                                    <Button className={classes.addButton} onClick={handleClick({ vertical: 'bottom', horizontal: 'left' })} type="submit" autoFocus variant="outlined" >Add</Button>
                                </l1>
                            </l1>

                        </div> 
                        </DialogActions>
                        </form>
                    </Dialog>
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal}}
                        open={openis}
                        onClose={handleClosing}
                        message="Mandatory fields can't be empty"
                        key={vertical + horizontal}
                    />

        </>
    );
}
export default Add
