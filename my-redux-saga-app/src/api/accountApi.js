import axios from 'axios';

const API_BASE_URL = 'https://localhost:7193/api/Products';

export const fetchAccounts = () => {
  console.log("Fetching accounts from API...");
  return axios.get(API_BASE_URL);
};

export const createAccount = (data) => {
  console.log("Creating account:", data);
  return axios.post(`${API_BASE_URL}/create`, data);
};

export const updateAccount = (id, data) => {
  console.log(`Updating account with ID: ${id}`, data);
  return axios.put(`${API_BASE_URL}/update/${id}`, data);
};

export const deleteAccount = (id) => {
  console.log(`Deleting account with ID: ${id}`);
  return axios.delete(`${API_BASE_URL}/${id}`);
};
