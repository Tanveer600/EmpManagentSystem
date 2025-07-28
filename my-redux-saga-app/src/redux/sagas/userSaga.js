import { put, takeEvery, call } from "redux-saga/effects";
import Swal from "sweetalert2";

import {
  SIGNUP_USER,
  LOGIN_USER,
  SET_USER,
  USER_ERROR,
  CREATE_USER,DELETE_USER,UPDATE_USER,FETCH_USERS,SET_USERS
} from "../constants/userConstants";


import {
   createUser as signupAPI,
  loginUser as loginAPI,
  createUsers as createAPI,
  deleteUser  as deleteAPI,
  updateUser as updateAPI,
  fetchUser as fetchAPI
 } from "../../api/userApi";

function* fetchUserSaga() {
  try {
    const response = yield call(fetchAPI);
    console.log("📥 Fetched users:", response.data);
  yield put({ type: SET_USERS, payload: response.data.data }); // ✅ Only the array

  } catch (error) {
    console.error("Fetch user failed", error);
  }
}
///////////////////////////////////

function* createUserSaga(action) {
  try {
    console.log("📤 Creating user with payload:", action.payload); // ✅ Log input data

    const response = yield call(createAPI, action.payload);
    console.log("✅ Create API response:", response.data); // ✅ Log API response

    yield call(fetchUserSaga); // Refresh table

    Swal.fire({
      icon: 'success',
      title: 'User created successfully',
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (error) {
    console.error("❌ Create failed", error);
    Swal.fire({
      icon: 'error',
      title: 'Create failed!',
      text: error.message,
    });
  }
}


function* deleteUserSaga(action) {
  try {
    yield call(deleteAPI, action.payload);
    yield call(fetchUserSaga); // Refresh table

    // ✅ Show success message
    Swal.fire({
      icon: 'success',
      title: 'user deleted successfully',
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


function* updateUserSaga(action) {
  try {
    yield call(updateAPI, action.payload.id, action.payload);
    yield call(fetchUserSaga);
  } catch (error) {
    console.error("Update failed", error);
  }
}
// SIGNUP
function* signupUserSaga(action) {
  try {
    const response = yield call(signupAPI, action.payload);
    yield put({ type: SET_USER, payload: response.data });

    Swal.fire({
      icon: "success",
      title: "Signup successful",
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (error) {
    yield put({ type: USER_ERROR, payload: error.message });
    Swal.fire({
      icon: "error",
      title: "Signup failed",
      text: error.message,
    });
  }
}

// LOGIN
function* loginUserSaga(action) {
  try {
  // ✅ CORRECT
const response = yield call(loginAPI, action.payload);

    yield put({ type: SET_USER, payload: response.data });
     // ✅ Save user data to sessionStorage
    sessionStorage.setItem("user", JSON.stringify(response.data));

    Swal.fire({
      icon: "success",
      title: "Login successful",
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (error) {
    yield put({ type: USER_ERROR, payload: error.message });
    Swal.fire({
      icon: "error",
      title: "Login failed",
      text: error.message,
    });
  }
}

// ROOT USER SAGA
export default function* userRootSaga() {
  yield takeEvery(SIGNUP_USER, signupUserSaga);
  yield takeEvery(LOGIN_USER, loginUserSaga);
   yield takeEvery(CREATE_USER, createUserSaga);
    yield takeEvery(UPDATE_USER, updateUserSaga);
     yield takeEvery(DELETE_USER, deleteUserSaga);
      yield takeEvery(FETCH_USERS, fetchUserSaga);
}
