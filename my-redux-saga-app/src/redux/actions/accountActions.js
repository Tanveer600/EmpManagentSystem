import { CREATE_ACCOUNT, UPDATE_ACCOUNT, DELETE_ACCOUNT, FETCH_ACCOUNTS } from "../constants/accountConstants";

export const fetchAccounts = () => ({ type: FETCH_ACCOUNTS });
export const createAccount = (account) => ({ type: CREATE_ACCOUNT, payload: account });
export const updateAccount = (account) => ({ type: UPDATE_ACCOUNT, payload: account });
export const deleteAccount = (id) => ({ type: DELETE_ACCOUNT, payload: id });
