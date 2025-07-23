
import { FETCH_SERVICEORDERS,CREATE_SERVICEORDER,DELETE_SERVICEORDER,UPDATE_SERVICEORDER } from "../constants/serviceOrderConstants";

export const fetchServiceOrders=()=>({
    type :FETCH_SERVICEORDERS
});
export const updateServiceOrder=(data)=>({
    type:UPDATE_SERVICEORDER,
    payload:data
});

export const createServiceOrder=(data)=>({
    type:CREATE_SERVICEORDER,
    payload:data
});
export const deleteServiceOrder=(id)=>({
    type:DELETE_SERVICEORDER,
    payload:id
})