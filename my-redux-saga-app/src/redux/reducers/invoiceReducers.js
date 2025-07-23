// src/redux/reducers/invoiceReducers.js
import { SET_INVOICE } from "../constants/invoiceConstants";

const initialState = {
    invoices: [],
};

export const invoicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INVOICE:
            return { ...state, invoices: action.payload };
        default:
            return state;
    }
};
