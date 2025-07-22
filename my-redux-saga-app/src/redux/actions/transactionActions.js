
import { CREATE_TRANSACTION,UPDATE_TRANSACTION,DELETE_TRANSACTION,FETCH_TRANSACTIONS } from "../constants/transactionsConstants";
export const fetchTransactions=()=>({type:FETCH_TRANSACTIONS});
export const createTransaction =(transaction)=>({type:CREATE_TRANSACTION,payload:transaction});
export const updateTransaction = (transaction) => ({ type: UPDATE_TRANSACTION, payload: transaction });
export const deleteTransaction = (id) => ({ type: DELETE_TRANSACTION, payload: id });