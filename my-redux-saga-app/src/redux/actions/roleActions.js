import {CREATE_ROLE,DELETE_ROLE,UPDATE_ROLE,FETCH_ROLES } from "../constants/roleConstants";

export const fetchRoles = () => ({ type: FETCH_ROLES });
export const createRole = (account) => ({ type: CREATE_ROLE, payload: account });
export const updateRole = (account) => ({ type: UPDATE_ROLE, payload: account });
export const deleteRole= (id) => ({ type: DELETE_ROLE, payload: id });
