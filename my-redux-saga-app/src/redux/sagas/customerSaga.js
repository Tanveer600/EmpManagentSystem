import Swal from "sweetalert2";
import { SET_CUSTOMERS, UPDATE_CUSTOMER, DELETE_CUSTOMER, FETCH_CUSTOMERS, CREATE_CUSTOMER } from "../constants/customerConstants";
import {
    CreateCustomer as createApi,
    updateCustomer as updateApi,
    deleteCustomer as deleteApi,
    fetchCustomer as fetchApi
} from "../../api/customerApi";
import { call,takeEvery,put } from "redux-saga/effects";

function * fetchCustomerSaga(){
    try{
const response=yield call(fetchApi);
yield put({type:SET_CUSTOMERS,payload:response.data});
    } catch(error){
console.info("fetch customer failed",error);
    }
}

function * createCustomerSaga(action){
    try {
yield call(createApi,action.payload);
yield call(fetchCustomerSaga);

      // ✅ Show success message
      Swal.fire({
        icon: 'success',
        title: 'Customer created successfully',
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

};
function* deleteCustomerSaga(action) {
  try {
    yield call(deleteApi, action.payload);
    yield call(fetchCustomerSaga); // Refresh table

    // ✅ Show success message
    Swal.fire({
      icon: 'success',
      title: 'customer deleted successfully',
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
  };
};
function* updateCustomerSaga(action) {
  try {
    yield call(updateApi, action.payload.id, action.payload);
    yield call(fetchCustomerSaga);
  } catch (error) {
    console.error("Update failed", error);
  };
};

export default function * customerRootSaga(){
yield takeEvery(FETCH_CUSTOMERS,fetchCustomerSaga);
yield takeEvery(UPDATE_CUSTOMER,updateCustomerSaga);
yield takeEvery(DELETE_CUSTOMER,deleteCustomerSaga);
yield takeEvery(CREATE_CUSTOMER,createCustomerSaga);
}