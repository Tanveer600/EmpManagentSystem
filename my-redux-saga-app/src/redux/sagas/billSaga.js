// src/redux/sagas/accountSaga.js
import Swal from 'sweetalert2';

import { put, takeEvery, call } from "redux-saga/effects";
import { SET_BILL,DELETE_BILL,UPDATE_BILL,CREATE_BILL,FETCH_BILLS } from '../constants/billConstants';
import {
  fetchBill as fetchAPI, // ✅ Correct
  createBill as createAPI,
  updateBill as updateAPI,
  deleteBill as deleteAPI,
} from '../../api/billApi';

function* fetchBillSaga() {
  try {
    const response = yield call(fetchAPI);
    yield put({ type: SET_BILL, payload: response.data.data });
  } catch (error) {
    console.error("Fetch accounts failed", error);
  }
}

function* createBillSaga(action) {
  try {
    yield call(createAPI, action.payload);
    yield call(fetchBillSaga); // Refresh table

    // ✅ Show success message
    Swal.fire({
      icon: 'success',
      title: 'Bill created successfully',
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

function* deleteBillSaga(action) {
  try {
    yield call(deleteAPI, action.payload);
    yield call(fetchBillSaga); // Refresh table

    // ✅ Show success message
    Swal.fire({
      icon: 'success',
      title: 'Bill deleted successfully',
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


function* updateBillSaga(action) {
  try {
    yield call(updateAPI, action.payload.id, action.payload);
    yield call(fetchBillSaga);
  } catch (error) {
    console.error("Update failed", error);
  }
}



export default function* BillRootSaga() {
  yield takeEvery(FETCH_BILLS, fetchBillSaga);
  yield takeEvery(CREATE_BILL, createBillSaga);
  yield takeEvery(UPDATE_BILL, updateBillSaga);
  yield takeEvery(DELETE_BILL, deleteBillSaga);
}
