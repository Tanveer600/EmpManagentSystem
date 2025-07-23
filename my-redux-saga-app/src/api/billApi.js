import axios from 'axios';

const API_BASE_URL = 'https://localhost:7043/api/Bill';

export const fetchBill = (data = {}) => {
  console.log("Fetching Bill from API...");
  return axios.post(`${API_BASE_URL}/get`, data);
};

export const createBill=(data)=>{
return axios.post(`${API_BASE_URL}/save`,data);
};
export const updateBill=(id,data)=>{
    return axios.put(`${API_BASE_URL}/save/${id}`,data);
};
export const deleteBill = (id) => {
  console.log("Deleting Bill with ID:", id);
  return axios.post(`${API_BASE_URL}/remove`, { ID: id }); 
};