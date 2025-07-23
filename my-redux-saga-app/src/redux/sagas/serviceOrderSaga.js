// src/redux/sagas/accountSaga.js
import Swal from 'sweetalert2';

import { put, takeEvery, call } from "redux-saga/effects";
import {  SET_SERVICEORDER,CREATE_SERVICEORDER,DELETE_SERVICEORDER,UPDATE_SERVICEORDER,FETCH_SERVICEORDERS } from '../constants/serviceOrderConstants';
import {
     fetchServiceOrders as fetchAPI,
     deleteServiceOrder as deleteAPI,
     updateServiceOrder as updateAPI,
     createServiceOrder as createAPI 
    } from '../../api/serviceOrderApi';

function* fetchServiceOrderSaga() {
  try {
    const response = yield call(fetchAPI);
    yield put({ type: SET_SERVICEORDER, payload: response.data.data });
  } catch (error) {
    console.error("Fetch accounts failed", error);
  }
}

function* createServiceOrderSaga(action) {
  try {
    yield call(createAPI, action.payload);
    yield call(fetchServiceOrderSaga); // Refresh table

    // ✅ Show success message
    Swal.fire({
      icon: 'success',
      title: 'SERVICE ORDER created successfully',
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

function* deleteServiceOrderSaga(action) {
  try {
    yield call(deleteAPI, action.payload);
    yield call(fetchServiceOrderSaga); // Refresh table

    // ✅ Show success message
    Swal.fire({
      icon: 'success',
      title: 'SERVICE ORDER deleted successfully',
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


function* updateServiceOrderSaga(action) {
  try {
    yield call(updateAPI, action.payload.id, action.payload);
    yield call(fetchServiceOrderSaga);
  } catch (error) {
    console.error("Update failed", error);
  }
}



export default function* ServiceOrderRootSaga() {
  yield takeEvery(FETCH_SERVICEORDERS, fetchServiceOrderSaga);
  yield takeEvery(CREATE_SERVICEORDER, createServiceOrderSaga);
  yield takeEvery(UPDATE_SERVICEORDER, updateServiceOrderSaga);
  yield takeEvery(DELETE_SERVICEORDER, deleteServiceOrderSaga);
}
