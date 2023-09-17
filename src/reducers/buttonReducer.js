const buttonreducer=(state=0,action)=>
{   
    switch(action.type){
        case 'ENABLEALLCHECKBOX':
            return  action.payload;
        case 'ENABLESELECTEDCHECKBOX':
            return action.payload;
        default: 
            return state;
    }
}
export default buttonreducer;