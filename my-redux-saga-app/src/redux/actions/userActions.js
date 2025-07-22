import { SIGNUP_USER, LOGIN_USER } from "../constants/userConstants";

export const signupUser = (data) => ({
  type: SIGNUP_USER,
  payload: data,
});

export const loginUser = (data) => ({
  type: LOGIN_USER,
  payload: data,
});
