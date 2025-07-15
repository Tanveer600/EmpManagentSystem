import { SET_ACCOUNTS } from "../constants/accountConstants";

const initialState = {
  accounts: [],
};

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCOUNTS:
      return { ...state, accounts: action.payload };
    default:
      return state;
  }
};
