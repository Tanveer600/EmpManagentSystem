import { SET_ROLE } from "../constants/roleConstants";
 
const initialzeBill={
    roles:[],
}

export const roleReducer=(state=initialzeBill,action)=>{
    switch(action.type)
    {
        case SET_ROLE:
        return {...state,roles:action.payload};
        default:
            return state;
    }
}