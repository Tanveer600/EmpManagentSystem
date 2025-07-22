import { put, takeEvery, call } from "redux-saga/effects";
import Swal from "sweetalert2";
import {
  SIGNUP_USER,
  LOGIN_USER,
  SET_USER,
  USER_ERROR,
} from "../constants/userConstants";
import {
  createUser as signupAPI,
  loginUser as loginAPI,
} from "../../api/userApi";

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
}
