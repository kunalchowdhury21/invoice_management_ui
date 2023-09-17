import React from 'react';
import Predict from "./Buttons/Predict.js";
import ViewCorrespondance from "./Buttons/ViewCorrespondance.js";
import Add from "./Buttons/Add.js";
import Edit from "./Buttons/Edit.js";
import Search from "./Buttons/Search.js";
import Delete from "./Buttons/Delete";
import DenseTable from "./Table/Table.js";
import {makeStyles} from '@material-ui/core';

const pixeltorem=px=>`${px/22.5}rem`;

const Gridbodycss=makeStyles({
        buttonflex:{
            paddingTop:pixeltorem(30),
            display:"flex",
            justifyContent:"space-between",
            paddingLeft:pixeltorem(30),
            paddingRight:pixeltorem(30)
        },
        buttonpad:{
            paddingRight:pixeltorem(20)
        },
        tableSep:{
            paddingTop:pixeltorem(11),
            paddingLeft:pixeltorem(30),
            paddingRight:pixeltorem(30),
        }
})
const Gridbody=()=>{
    const classes=Gridbodycss();
    return(
        <>
            <div className={classes.buttonflex}>
                <div>
                    <l1 className={classes.buttonpad}><Predict/></l1>
                    <l1><ViewCorrespondance/></l1>
                </div>
                <div>
                    <l1 className={classes.buttonpad}><Add/></l1>
                    <l1 className={classes.buttonpad}><Edit/></l1>
                    <l1 className={classes.buttonpad}><Delete/></l1>
                    <l1 ><Search/></l1>
                </div>
            </div>
            <div  className={classes.tableSep}>
                <DenseTable/>
            </div>
        </>
    );
}
export default Gridbody