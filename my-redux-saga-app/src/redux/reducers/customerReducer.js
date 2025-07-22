import { SET_CUSTOMERS } from "../constants/customerConstants";

const initialState = {
    customers: [],
};

export const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CUSTOMERS:
            return { ...state, customers: action.payload }; // ✅ Fix: use payload instead of type
        default:
            return state;
    }
};
