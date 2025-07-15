import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { accountReducer } from "./reducers/accountReducer";
import accountSaga from "./sagas/accountSaga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  account: accountReducer,
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(accountSaga);

export default store;
