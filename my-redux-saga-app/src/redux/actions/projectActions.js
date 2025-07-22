
import { CREATE_PROJECT,FETCH_PROJECTS,DELETE_PROJECT,UPDATE_PROJECT } from "../constants/projectsConstants";

export const fetchProject=()=>({
type:FETCH_PROJECTS
});
export const createProject=(project)=>({
type:CREATE_PROJECT,
payload:project
});
export const updateProject=(project)=>({
type:UPDATE_PROJECT,
payload:project
});
export const deleteProject=(id)=>({
type:DELETE_PROJECT,
payload:id
});