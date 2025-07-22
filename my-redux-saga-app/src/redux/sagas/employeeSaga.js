// src/redux/sagas/accountSaga.js
import Swal from 'sweetalert2';

import { put, takeEvery, call } from "redux-saga/effects";
import { SET_EMPLOYEE,UPDATE_EMPLOYEE,DELETE_EMPLOYEE,CREATE_EMPLOYEE, FETCH_EMPLOYEE } from '../constants/employeeConstants';
import { 

  fetchEmployee as fetchAPI,
  CreateEmployee as createAPI,
  updateEmployee as updateAPI,
  deleteEmployee as deleteAPI,


 } from '../../api/employeeApi';
function* fetchEmployeeSaga() {
  try {
    const response = yield call(fetchAPI);
    yield put({ type: SET_EMPLOYEE, payload: response.data.data });
  } catch (error) {
    console.error("Fetch accounts failed", error);
  }
}

function* createEmployeeSaga(action) {
  try {
    yield call(createAPI, action.payload);
    yield call(fetchEmployeeSaga); // Refresh table

    // ✅ Show success message
    Swal.fire({
      icon: 'success',
      title: 'Employee created successfully',
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

function* deleteEmployeeSaga(action) {
  try {
    yield call(deleteAPI, action.payload);
    yield call(fetchEmployeeSaga); // Refresh table

    // ✅ Show success message
    Swal.fire({
      icon: 'success',
      title: 'Employee deleted successfully',
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


function* updateEmployeeSaga(action) {
  try {
    yield call(updateAPI, action.payload.id, action.payload);
    yield call(fetchEmployeeSaga);
  } catch (error) {
    console.error("Update failed", error);
  }
}



export default function* EmployeeRootSaga() {
  yield takeEvery(FETCH_EMPLOYEE, fetchEmployeeSaga);
  yield takeEvery(CREATE_EMPLOYEE, createEmployeeSaga);
  yield takeEvery(UPDATE_EMPLOYEE, updateEmployeeSaga);
  yield takeEvery(DELETE_EMPLOYEE, deleteEmployeeSaga);
}
