import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';

const pixeltorem=px=>`${px/22.5}rem`;

const GridHeaderStyling=makeStyles({
    font:{
        fontSize:pixeltorem(28),
        color:"#FFFFFF"
    }
})

const Gridheader=()=>{
    const classes=GridHeaderStyling();
    return(
        <Typography className={classes.font}>Invoice List</Typography>
    );
}
export default Gridheader