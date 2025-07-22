import Swal from 'sweetalert2';
import { put, takeEvery, call } from 'redux-saga/effects';
import {
  FETCH_TRANSACTIONS,
  SET_TRANSACTIONS,
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
} from '../constants/transactionsConstants';  // ✅ relative to sagas folder

import {
  fetchTransactions as fetchAPI,
  createTransaction as createAPI,
  updateTransaction as updateAPI,
  deleteTransaction as deleteAPI,
} from '../../api/transactionApi';

function* fetchTransactionsSaga() {
  try {
    const response = yield call(fetchAPI);
    yield put({ type: SET_TRANSACTIONS, payload: response.data });
  } catch (error) {
    console.error('Fetch transactions failed', error);
  }
}

function* createTransactionSaga(action) {
  try {
    yield call(createAPI, action.payload);
    yield call(fetchTransactionsSaga);

    Swal.fire({
      icon: 'success',
      title: 'Transaction created successfully',
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (error) {
    console.error('Create failed', error);
    Swal.fire({
      icon: 'error',
      title: 'Create failed!',
      text: error.message,
    });
  }
}

function* updateTransactionSaga(action) {
  try {
    yield call(updateAPI, action.payload.id, action.payload);
    yield call(fetchTransactionsSaga);

    Swal.fire({
      icon: 'success',
      title: 'Transaction updated successfully',
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (error) {
    console.error('Update failed', error);
    Swal.fire({
      icon: 'error',
      title: 'Update failed!',
      text: error.message,
    });
  }
}

function* deleteTransactionSaga(action) {
  try {
    yield call(deleteAPI, action.payload);
    yield call(fetchTransactionsSaga);

    Swal.fire({
      icon: 'success',
      title: 'Transaction deleted successfully',
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (error) {
    console.error('Delete failed', error);
    Swal.fire({
      icon: 'error',
      title: 'Delete failed!',
      text: error.message,
    });
  }
}

export default function* transactionrootSaga() {
  yield takeEvery(FETCH_TRANSACTIONS, fetchTransactionsSaga);
  yield takeEvery(CREATE_TRANSACTION, createTransactionSaga);
  yield takeEvery(UPDATE_TRANSACTION, updateTransactionSaga);
  yield takeEvery(DELETE_TRANSACTION, deleteTransactionSaga);
}
