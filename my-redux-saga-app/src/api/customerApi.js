import axios from "axios";
 const API_BASE_URL='https://localhost:7043/api/Customer';

export const fetchCustomer=()=>{
    return axios.get(API_BASE_URL);
};
export const CreateCustomer=(data)=>{
return axios.post(`${API_BASE_URL}/create`,data);
};
export const updateCustomer=(id,data)=>{
    return axios.put(`${API_BASE_URL}/update/${id}`,data);
};
export const deleteCustomer=(id)=>{
    return axios.delete(`${API_BASE_URL}/${id}`);
}