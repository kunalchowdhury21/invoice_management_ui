import React from "react";
import Header from "./components/Header";
import GridPanelSection from "./components/GridPanelSection";
import {makeStyles} from '@material-ui/core';


const pixeltorem=px=>`${px/22.5}rem`;

const RenderingSection=makeStyles({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4rem',
      height: '0.1rem',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#6D7183',
      outline: '1px solid slategrey',
    },
  },
  spacing:{
      paddingLeft:pixeltorem(30),
      paddingRight:pixeltorem(30),
      backgroundColor:"#3a4b5f",
      paddingBottom:pixeltorem(31),
  },
})
const App=()=>{
    const classes=RenderingSection();
    return(
      <>
      <div className={classes.spacing}>
        <Header/>
        <GridPanelSection/>
      </div>
      </>
    );
}
export default App