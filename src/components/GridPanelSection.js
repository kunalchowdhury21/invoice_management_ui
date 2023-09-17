import Gridheader from "./GridPanelSection/Gridheader";
import Gridbody from "./GridPanelSection/Gridbody";
import {makeStyles} from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Provider} from "react-redux";
import store from "../reducers/store.js";

const pixeltorem=px=>`${px/22.5}rem`;

const GridPannel=makeStyles({
    gridheader:{
        marginTop:pixeltorem(30)
    },
    gridbody:{
        marginTop:pixeltorem(30),
        backgroundColor:"#273D49CC",
        borderRadius:pixeltorem(10),
        height:pixeltorem(800)
    }
})

const GridPanelSection=()=>{
    const classes=GridPannel();
    return(
        <>
        <div className={classes.gridheader}><Gridheader/></div>
        <Provider store={store}><Paper className={classes.gridbody} elevation={"0rem"}><Gridbody/></Paper></Provider>
        </>
    );
}
export default GridPanelSection