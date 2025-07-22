
import { SET_PROJECT } from "../constants/projectsConstants";

const initialState={
    projects:[],
}
export const projectReducer=(state=initialState,action)=>{
switch(action.type)
{
    case SET_PROJECT:
        return {...state,projects:action.payload};
        default:
            return state;
}
}