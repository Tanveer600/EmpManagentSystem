import axios from "axios";
const LOGIN_BASE_URL = "https://localhost:7043/api/User";

export const createUser = (data) => axios.post(`${LOGIN_BASE_URL}/signup`, data);
export const loginUser = (data) =>
  axios.post(`${LOGIN_BASE_URL}/login`, data);

