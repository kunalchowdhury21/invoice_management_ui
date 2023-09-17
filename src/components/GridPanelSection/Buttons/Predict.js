import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { DialogContent } from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import {useSelector} from 'react-redux';

const pixeltorem=px=>`${px/22.5}rem`;

const PredictButtonandModal=makeStyles({
    grid_predict_button:{
        padding:"0.2rem",
        borderRadius:pixeltorem(10),
        height:pixeltorem(45),
        width:pixeltorem(106),
        color:"#FFFFFF",
        textTransform:'none',
        minWidth:"0.3rem",
        border:"0.08rem",
    }
})

const Predict=()=>
{   const classes=PredictButtonandModal();

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
    return(
        <>
            <Button className={"external"}
             size="small" disabled={myFunction()} 
             className={classes.grid_predict_button} 
             variant="outlined"  
             style ={ (enableDisable>0)? { background : "#14AFF1" }:{ background :"#97A1A9" }}
             onClick={handleClickOpen}>Predict</Button>
                    
                    
                    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                        <DialogTitle>Add Invoice
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                         </DialogTitle>
                         <DialogContent dividers>
                            <form>
                                <label for="fname">Customer Name *</label>
                                <input type="text" id="fname" name="fname"></input>
                                <label for="due">Due in Date *</label>
                                <input type="text" id="due" name="due"></input><br></br>
                                <label for="cno">Customer No. *</label>
                                <input type="text" id="cno" name="cno"></input>
                                
                            </form>
                         </DialogContent>
                    </Dialog>
        </>
    );

}
export default Predict