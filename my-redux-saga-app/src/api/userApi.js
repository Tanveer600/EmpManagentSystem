import axios from "axios";
const LOGIN_BASE_URL = "https://localhost:7043/api/User";

export const createUser = (data) => axios.post(`${LOGIN_BASE_URL}/signup`, data);
export const loginUser = (data) =>
  axios.post(`${LOGIN_BASE_URL}/login`, data);



export const fetchUser = (data = {}) => {
  console.log("Fetching user from API...");
  return axios.post(`${LOGIN_BASE_URL}/get`, data);
};

export const createUsers = (data) => {
  const isFormData = data instanceof FormData;

  return axios.post(`${LOGIN_BASE_URL}/save`, data, {
    headers: {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    },
  });
};

export const updateUser = (id, data) => {
  const isFormData = data instanceof FormData;

  return axios.put(`${LOGIN_BASE_URL}/save/${id}`, data, {
    headers: {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    },
  });
};

export const deleteUser = (id) => {
  console.log("Deleting user with ID:", id);
  return axios.post(`${LOGIN_BASE_URL}/remove`, { ID: id }); 
};

