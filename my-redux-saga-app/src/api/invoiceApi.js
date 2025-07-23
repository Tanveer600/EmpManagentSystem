import axios from 'axios';

const API_BASE_URL = 'https://localhost:7043/api/Invoice';

export const fetchInvoice = (data = {}) => {
  console.log("Fetching Invoice from API...");
  return axios.post(`${API_BASE_URL}/get`, data);
};

export const createInvoice=(data)=>{
return axios.post(`${API_BASE_URL}/save`,data);
};
export const updateInvoice=(id,data)=>{
    return axios.put(`${API_BASE_URL}/save/${id}`,data);
};
export const deleteInvoice = (id) => {
  console.log("Deleting Invoice with ID:", id);
  return axios.post(`${API_BASE_URL}/remove`, { ID: id }); 
};