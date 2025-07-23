// src/redux/sagas/accountSaga.js
import Swal from 'sweetalert2';

import { put, takeEvery, call } from "redux-saga/effects";
import { SET_INVOICE,CREATE_INVOICE,DELETE_INVOICE,UPDATE_INVOICE,FETCH_INVOICES } from '../constants/invoiceConstants';
import {
  fetchInvoice as fetchAPI, // ✅ Correct
  createInvoice as createAPI,
  updateInvoice as updateAPI,
  deleteInvoice as deleteAPI,
} from '../../api/invoiceApi';

function* fetchInvoiceSaga() {
  try {
    const response = yield call(fetchAPI);
    yield put({ type: SET_INVOICE, payload: response.data.data });
  } catch (error) {
    console.error("Fetch accounts failed", error);
  }
}

function* createInvoiceSaga(action) {
  try {
    yield call(createAPI, action.payload);
    yield call(fetchInvoiceSaga); // Refresh table

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

function* deleteInvoiceSaga(action) {
  try {
    yield call(deleteAPI, action.payload);
    yield call(fetchInvoiceSaga); // Refresh table

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


function* updateInvoiceSaga(action) {
  try {
    yield call(updateAPI, action.payload.id, action.payload);
    yield call(fetchInvoiceSaga);
  } catch (error) {
    console.error("Update failed", error);
  }
}



export default function* InvoiceRootSaga() {
  yield takeEvery(FETCH_INVOICES, fetchInvoiceSaga);
  yield takeEvery(CREATE_INVOICE, createInvoiceSaga);
  yield takeEvery(UPDATE_INVOICE, updateInvoiceSaga);
  yield takeEvery(DELETE_INVOICE, deleteInvoiceSaga);
}
