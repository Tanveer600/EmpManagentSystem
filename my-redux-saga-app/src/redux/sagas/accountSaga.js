// src/redux/sagas/accountSaga.js
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
    yield call(fetchAccountsSaga); // refresh list
  } catch (error) {
    console.error("Create failed", error);
  }
}

function* updateAccountSaga(action) {
  try {
    yield call(updateAPI, action.payload.id, action.payload);
    yield call(fetchAccountsSaga);
  } catch (error) {
    console.error("Update failed", error);
  }
}

function* deleteAccountSaga(action) {
  try {
    yield call(deleteAPI, action.payload);
    yield call(fetchAccountsSaga);
  } catch (error) {
    console.error("Delete failed", error);
  }
}

export default function* accountRootSaga() {
  yield takeEvery(FETCH_ACCOUNTS, fetchAccountsSaga);
  yield takeEvery(CREATE_ACCOUNT, createAccountSaga);
  yield takeEvery(UPDATE_ACCOUNT, updateAccountSaga);
  yield takeEvery(DELETE_ACCOUNT, deleteAccountSaga);
}
