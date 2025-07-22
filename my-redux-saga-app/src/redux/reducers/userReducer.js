import { SET_USER } from "../constants/userConstants";

const initialState = {
    user: null, // or use {} if you prefer
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        default:
            return state;
    }
};
