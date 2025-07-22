import { SET_EMPLOYEE } from "../constants/employeeConstants";

const initialState={
    employees:[]
}

export const employeeReducer=(state=initialState,action)=>{
    switch(action.type){
        case SET_EMPLOYEE:
        return {...state,employees:action.payload};
         default:
        return state
    }

   

}