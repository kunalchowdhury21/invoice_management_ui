export const loadData=(val1)=>(
    {
    type: 'DATALOADING',
    payload:val1
});

export const setPage=(val2)=>({
    type:'SETPAGE',
    payload:val2
});
export const setFlag=(val3)=>({
    type:'SETFLAG',
    payload:val3
});


export const loadSearchData=(val4)=>({
    type:'SEARCHDATALOADING',
    payload:val4
});
export const searchBarLength=(val5)=>({
    type:'SEARCHBARLENGTH',
    payload:val5
});
export const searchData=(val6)=>({
    type:'SEARCHDATA',
    payload:val6
});
export const searchPage=(val7)=>({
    type:'SEARCHPAGE',
    payload:val7
});
export const resetData=()=>({
    type:'RESETDATA',
});
