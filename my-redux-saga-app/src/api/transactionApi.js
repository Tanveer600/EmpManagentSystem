import axios from "axios";
const API_BASE_URL='https://localhost:7043/api/Transaction';


export const fetchTransactions = () => {
  console.log("Fetching accounts from API...");
  return axios.get(API_BASE_URL);
};

export const createTransaction = (data) => {
  console.log("Creating account:", data);
  return axios.post(`${API_BASE_URL}/create`, data);
};

export const updateTransaction = (id, data) => {
  console.log(`Updating account with ID: ${id}`, data);
  return axios.put(`${API_BASE_URL}/update/${id}`, data);
};

export const deleteTransaction = (id) => {
  console.log(`Deleting account with ID: ${id}`);
  return axios.delete(`${API_BASE_URL}/${id}`);
};