export const enableDisableAll=(value1)=>
{
    return{
        type:'ENABLEALLCHECKBOX',
        payload:value1
    }
}

export const enableDisableSelected=(value2)=>
{   
    return{
        type:'ENABLESELECTEDCHECKBOX',
        payload:value2
    }
}