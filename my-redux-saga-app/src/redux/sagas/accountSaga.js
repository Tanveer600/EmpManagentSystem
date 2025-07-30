// src/redux/sagas/accountSaga.js
import Swal from 'sweetalert2';

import { put, takeEvery, call } from "redux-saga/effects";
import {
  FETCH_ACCOUNTS,
  SET_ACCOUNTS,
  CREATE_ACCOUNT,
  UPDATE_ACCOUNT,
  DELETE_ACCOUNT,
} from "../constants/accountConstants";
import {
  fetchAccounts as fetchAPI,
  createAccount as createAPI,
  updateAccount as updateAPI,
  deleteAccount as deleteAPI,
} from "../../api/accountApi"; // ✅ use real API functions

function* fetchAccountsSaga() {
  try {
    const response = yield call(fetchAPI);
    yield put({ type: SET_ACCOUNTS, payload: response.data });
  } catch (error) {
    console.error("Fetch accounts failed", error);
  }
}

function* createAccountSaga(action) {
  try {
    yield call(createAPI, action.payload);
    yield call(fetchAccountsSaga); // Refresh table

    // ✅ Show success message
    Swal.fire({
      icon: 'success',
      title: 'Account created successfully',
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

function* deleteAccountSaga(action) {
  try {
    yield call(deleteAPI, action.payload);
    yield call(fetchAccountsSaga); // Refresh table

    // ✅ Show success message
    Swal.fire({
      icon: 'success',
      title: 'Account deleted successfully',
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


function* updateAccountSaga(action) {
  try {
    const { id, data } = action.payload;
    console.log("Updating account with ID:", id); // should show correct ID now

    const response = yield call(updateAPI, { id, data });
 yield call(fetchAccountsSaga); // Refresh table
 

    yield put({ type: "UPDATE_ACCOUNT_SUCCESS", payload: response.data });
     Swal.fire({
      icon: 'success',
      title: 'Account Updarted successfully',
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (error) {
    console.error("Update failed", error);
    yield put({ type: "ACCOUNT_ERROR", payload: error.message });
    Swal.fire({
      icon: 'error',
      title: 'updated failed!',
      text: error.message,
    });
  }
}




export default function* accountRootSaga() {
  yield takeEvery(FETCH_ACCOUNTS, fetchAccountsSaga);
  yield takeEvery(CREATE_ACCOUNT, createAccountSaga);
  yield takeEvery(UPDATE_ACCOUNT, updateAccountSaga);
  yield takeEvery(DELETE_ACCOUNT, deleteAccountSaga);
}
