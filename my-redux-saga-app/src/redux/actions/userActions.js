import { SIGNUP_USER, LOGIN_USER ,CREATE_USER,DELETE_USER,UPDATE_USER,FETCH_USERS,SET_LOGOUT} from "../constants/userConstants";
export const fetchUsers=()=>({
    type :FETCH_USERS
});
export const updateUser=(data)=>({
    type:UPDATE_USER,
    payload:data
});

export const createUser=(data)=>({
    type:CREATE_USER,
    payload:data
});
export const deleteUser=(id)=>({
    type:DELETE_USER,
    payload:id
})
export const signupUser = (data) => ({
  type: SIGNUP_USER,
  payload: data,
});

export const loginUser = (data) => ({
  type: LOGIN_USER,
  payload: data,
});
// ✅ LOGOUT user
export const logoutUser = () => ({
  type: SET_LOGOUT,
});