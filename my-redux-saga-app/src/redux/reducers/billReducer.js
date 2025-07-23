import { SET_BILL } from "../constants/billConstants";
 
const initialzeBill={
    bills:[],
}

export const billReducer=(state=initialzeBill,action)=>{
    switch(action.type)
    {
        case SET_BILL:
        return {...state,bills:action.payload};
        default:
            return state;
    }
}