
import axios from 'axios';

const API_BASE_URL = 'https://localhost:7043/api/Role';

export const fetchRole = (data = {}) => {
  console.log("Fetching role from API...");
  return axios.post(`${API_BASE_URL}/get`, data);
};

export const createRole=(data)=>{
return axios.post(`${API_BASE_URL}/save`,data);
};
export const updateRole=(id,data)=>{
    return axios.put(`${API_BASE_URL}/save/${id}`,data);
};
export const deleteRole = (id) => {
  console.log("Deleting role with ID:", id);
  return axios.post(`${API_BASE_URL}/remove`, { ID: id }); 
};