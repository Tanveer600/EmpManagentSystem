
import { FETCH_EMPLOYEE,DELETE_EMPLOYEE,UPDATE_EMPLOYEE, CREATE_EMPLOYEE } from "../constants/employeeConstants";

export const fetchEmployees=()=>({
    type :FETCH_EMPLOYEE
});
export const updateEmployee=(data)=>({
    type:UPDATE_EMPLOYEE,
    payload:data
});

export const createEmployee=(data)=>({
    type:CREATE_EMPLOYEE,
    payload:data
});
export const deleteEmployee=(id)=>({
    type:DELETE_EMPLOYEE,
    payload:id
})