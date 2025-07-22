
import { FETCH_CUSTOMERS,UPDATE_CUSTOMER,DELETE_CUSTOMER,CREATE_CUSTOMER } from "../constants/customerConstants";


export const fetchCustomer=()=>({
    type:FETCH_CUSTOMERS,

});
export const createCustomer=(data)=>({
    type:CREATE_CUSTOMER,
    payload:data
});
export const updateCustomer=(id)=>({
    type:UPDATE_CUSTOMER,
    payload:id
});
export const deleteCustomer=(id)=>({
    type:DELETE_CUSTOMER,
    payload:id
});