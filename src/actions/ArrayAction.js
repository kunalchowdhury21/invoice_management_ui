export const selectAllArray=(value1)=>
{
    return{
        type:'SELECTALLARRAY',
        payload:value1
    }
}

export const selectiveArray=(value2)=>
{   
    return{
        type:'SELECTIVEARRAY',
        payload:value2
    }
}