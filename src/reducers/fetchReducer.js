const initialstate={
    data:[],
    flag:true,
    pageNo:0,

    data1:[],
    searchBarLength:0,
    searchData:"",
    pageNo1:0,
};

const fetchReducer=(state=initialstate,action)=>{
    switch(action.type){
        case 'DATALOADING':
            return{
                ...state,
                data:[...state.data,...action.payload]
            }
        case 'SETPAGE':
            return{
                ...state,
                pageNo:state.pageNo+action.payload
            }
        case 'SETFLAG':
            return{
                ...state,
                flag:action.payload
            }


        
        case 'SEARCHDATALOADING':
            return{
                ...state,
                data1:[...state.data1,...action.payload]
            }
        case 'SEARCHBARLENGTH':
            return{
                ...state,
                searchBarLength:action.payload
            }
        case 'SEARCHDATA':
            return{
                ...state,
                searchData:action.payload
            }
        case 'SEARCHPAGE':
            return{
                ...state,
                pageNo1:state.pageNo1+action.payload
            }
        case 'RESETDATA':
            return{
                ...state,
                data1:[],
                pageNo1:0,

            }
        default:
            return state;
    }
}
export default fetchReducer;