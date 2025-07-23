import { all } from 'redux-saga/effects';
import accountRootSaga from './accountSaga';
import transactionrootSaga from './transactionSaga';
import customerRootSaga from './customerSaga';
import projectRootSaga from './projectSaga'
import userRootSaga from './userSaga';
import EmployeeRootSaga from './employeeSaga';
import BillRootSaga from './billSaga';
import ServiceOrderRootSaga from './serviceOrderSaga'
import InvoiceRootSaga from './invoiceSaga';
export default function* rootSaga() {
  yield all([
    accountRootSaga(),
    transactionrootSaga(), // when ready
    customerRootSaga(),
    projectRootSaga(),
    userRootSaga(),
    EmployeeRootSaga(),
    BillRootSaga(),
    ServiceOrderRootSaga(),
    InvoiceRootSaga(),

  ]);
}
