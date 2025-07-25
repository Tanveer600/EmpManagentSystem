// src/redux/sagas/accountSaga.js
import Swal from 'sweetalert2';

import { put, takeEvery, call } from "redux-saga/effects";
import { SET_ROLE,DELETE_ROLE,UPDATE_ROLE,CREATE_ROLE,FETCH_ROLES } from '../constants/roleConstants';
import {
  fetchRole as fetchAPI, // ✅ Correct
  createRole as createAPI,
  updateRole as updateAPI,
  deleteRole as deleteAPI,
} from '../../api/roleApi';

function* fetchRoleSaga() {
  try {
    const response = yield call(fetchAPI);
    yield put({ type: SET_ROLE, payload: response.data.data });
  } catch (error) {
    console.error("Fetch ROLES failed", error);
  }
}

function* createRoleSaga(action) {
  try {
    yield call(createAPI, action.payload);
    yield call(fetchRoleSaga); // Refresh table

    // ✅ Show success message
    Swal.fire({
      icon: 'success',
      title: 'role created successfully',
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

function* deleteRoleSaga(action) {
  try {
    yield call(deleteAPI, action.payload);
    yield call(fetchRoleSaga); // Refresh table

    // ✅ Show success message
    Swal.fire({
      icon: 'success',
      title: 'role deleted successfully',
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


function* updateRoleSaga(action) {
  try {
    yield call(updateAPI, action.payload.id, action.payload);
    yield call(fetchRoleSaga);
  } catch (error) {
    console.error("Update failed", error);
  }
}



export default function* RoleRootSaga() {
  yield takeEvery(FETCH_ROLES, fetchRoleSaga);
  yield takeEvery(CREATE_ROLE, createRoleSaga);
  yield takeEvery(UPDATE_ROLE, updateRoleSaga);
  yield takeEvery(DELETE_ROLE, deleteRoleSaga);
}
