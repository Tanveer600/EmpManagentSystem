import { SET_SERVICEORDER } from "../constants/serviceOrderConstants";
 
const initialzeBill={
    serviceorders:[],
}

export const serviceordersReducer=(state=initialzeBill,action)=>{
    switch(action.type)
    {
        case SET_SERVICEORDER:
        return {...state,serviceorders:action.payload};
        default:
            return state;
    }
}