
import { FETCH_BILLS,CREATE_BILL,DELETE_BILL,UPDATE_BILL } from "../constants/billConstants";

export const fetchBills=()=>({
    type :FETCH_BILLS
});
export const updateBill=(data)=>({
    type:UPDATE_BILL,
    payload:data
});

export const createBill=(data)=>({
    type:CREATE_BILL,
    payload:data
});
export const deleteBill=(id)=>({
    type:DELETE_BILL,
    payload:id
})