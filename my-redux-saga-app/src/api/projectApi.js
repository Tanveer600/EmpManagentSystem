import axios from 'axios';

const API_BASE_URL = 'https://localhost:7043/api/Project';

export const fetchProjects = () => {
  console.log("Fetching project data from API...");
  return axios.get(API_BASE_URL);
};

export const createProject = (data) => {
  console.log("Creating project:", data);
  return axios.post(`${API_BASE_URL}/create`, data);
};

export const updateProject = (id, data) => {
  console.log(`Updating project with ID: ${id}`, data);
  return axios.put(`${API_BASE_URL}/update/${id}`, data);
};

export const deleteProject = (id) => {
  console.log(`Deleting project with ID: ${id}`);
  return axios.delete(`${API_BASE_URL}/${id}`);
};
