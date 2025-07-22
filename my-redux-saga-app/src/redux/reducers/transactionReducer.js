import { SET_TRANSACTIONS } from "../constants/transactionsConstants";

const initialState = {
  transactions: [],
};

export const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRANSACTIONS:
      return { ...state, transactions: action.payload };
    default:
      return state;
  }
};
