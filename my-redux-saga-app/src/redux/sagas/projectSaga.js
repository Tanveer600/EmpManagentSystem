// src/redux/sagas/accountSaga.js
import Swal from 'sweetalert2';

import { put, takeEvery, call } from "redux-saga/effects";
import {
 FETCH_PROJECTS,CREATE_PROJECT,DELETE_PROJECT,UPDATE_PROJECT,
 SET_PROJECT
} from "../constants/projectsConstants";
import {
  fetchProjects as fetchAPI,
  createProject as createAPI,
  updateProject as updateAPI,
  deleteProject as deleteAPI,
} from "../../api/projectApi"; // ✅ use real API functions

function* fetchProjectSaga() {
  try {
    const response = yield call(fetchAPI);
    yield put({ type: SET_PROJECT, payload: response.data });
  } catch (error) {
    console.error("Fetch Project failed", error);
  }
}

function* createProjectSaga(action) {
  try {
    yield call(createAPI, action.payload);
    yield call(fetchProjectSaga); // Refresh table

    // ✅ Show success message
    Swal.fire({
      icon: 'success',
      title: 'PROJECT created successfully',
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (error) {
    console.error("Create failed", error);
    Swal.fire({
      icon: 'error',
      title: 'Create failed!',
      text: error.message,
    });
  }
}

function* deleteProjectSaga(action) {
  try {
    yield call(deleteAPI, action.payload);
    yield call(fetchProjectSaga); // Refresh table

    // ✅ Show success message
    Swal.fire({
      icon: 'success',
      title: 'Project deleted successfully',
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (error) {
    console.error("Delete failed", error);
    Swal.fire({
      icon: 'error',
      title: 'Delete failed!',
      text: error.message,
    });
  }
}


function* updateProjectSaga(action) {
  try {
    yield call(updateAPI, action.payload.id, action.payload);
    yield call(fetchProjectSaga);
  } catch (error) {
    console.error("Update failed", error);
  }
}



export default function* projectRootSaga() {
  yield takeEvery(FETCH_PROJECTS, fetchProjectSaga);
  yield takeEvery(CREATE_PROJECT, createProjectSaga);
  yield takeEvery(UPDATE_PROJECT, updateProjectSaga);
  yield takeEvery(DELETE_PROJECT, deleteProjectSaga);
}
