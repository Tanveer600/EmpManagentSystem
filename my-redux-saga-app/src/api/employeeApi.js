import axios from 'axios';

const API_BASE_URL = 'https://localhost:7043/api/Employee';

// Fetch all accounts using POST with optional filter model (like ID)
export const fetchEmployee = (data = {}) => {
  console.log("Fetching Employee from API...");
  return axios.post(`${API_BASE_URL}/get`, data); // your API expects POST, not GET
};

export const CreateEmployee=(data)=>{
return axios.post(`${API_BASE_URL}/save`,data);
};
export const updateEmployee=(id,data)=>{
    return axios.put(`${API_BASE_URL}/save/${id}`,data);
};
// Delete account by sending model with ID
export const deleteEmployee = (id) => {
  console.log("Deleting Employee with ID:", id);
  return axios.post(`${API_BASE_URL}/remove`, { ID: id }); // API expects model with ID
};
