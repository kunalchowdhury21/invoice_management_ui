import ABCProduct from "../assets/Group 20399.svg";
import HRClogo from "../assets/HRClogo.svg";
import {makeStyles} from "@material-ui/core";

const pixeltorem=px=>`${px/22.5}rem`;

const ImageStyles=makeStyles({
    companylogo:{
        height:pixeltorem(50),
        width:pixeltorem(300)
    },
    hrclogo:{
        marginLeft:pixeltorem(501.64),
        height:pixeltorem(49.5),
        width:pixeltorem(235)
    },
    imagediv:{
        paddingTop:pixeltorem(20),
    }
})


const Header=()=>{
    const classes=ImageStyles();
    return(
        <div className={classes.imagediv}>
            <img className={classes.companylogo} src={ABCProduct} alt="Company Logo"/>
            <img className={classes.hrclogo} src={HRClogo} alt="Hrc Logo"/>
        </div>
        
    );
};
export default Header