import { combineReducers } from "redux";
import { accountReducer } from "./reducers/accountReducer";
import { transactionReducer } from "./reducers/transactionReducer";
import { customerReducer } from "./reducers/customerReducer";
import { projectReducer } from "./reducers/projectReducer";
import { userReducer } from "./reducers/userReducer";
import { employeeReducer } from "./reducers/employeeReducer";

const rootReducer = combineReducers({
  account: accountReducer,
  transaction:transactionReducer,
  customer:customerReducer,
  project:projectReducer,
  user:userReducer,
  employee:employeeReducer
});

export default rootReducer;
