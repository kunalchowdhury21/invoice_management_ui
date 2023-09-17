const initialstate={
    viewdata:[],
};
const ViewCorrespondance=(state=initialstate,action)=>{
    switch(action.type){
        case 'VIEWDATA':
            return{
                ...state,
                viewdata:[...action.payload]
            }
            default:
                return state;
        }
    }
export default ViewCorrespondance;