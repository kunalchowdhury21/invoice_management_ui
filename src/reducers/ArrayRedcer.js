const docidArrayreducer=(state=0,action)=>
{   
    switch(action.type){
        case 'SELECTALLARRAY':
            return  action.payload;
        case 'SELECTIVEARRAY':
            return action.payload;
        default: 
            return state;
    }
}
export default docidArrayreducer;