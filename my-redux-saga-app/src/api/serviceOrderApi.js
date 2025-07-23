import axios from 'axios';

const API_BASE_URL = 'https://localhost:7043/api/ServiceOrder';

export const fetchServiceOrders = (data = {}) => {
  console.log("Service Order Bill from API...");
  return axios.post(`${API_BASE_URL}/get`, data);
};

export const createServiceOrder=(data)=>{
return axios.post(`${API_BASE_URL}/save`,data);
};
export const updateServiceOrder=(id,data)=>{
    return axios.put(`${API_BASE_URL}/save/${id}`,data);
};
export const deleteServiceOrder= (id) => {
  console.log("Deleting Service Order with ID:", id);
  return axios.post(`${API_BASE_URL}/remove`, { ID: id }); 
};