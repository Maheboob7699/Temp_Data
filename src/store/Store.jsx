import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";  
import signupReducer from "./signup/UserReducer";
import loginReducer from "./login/loginReducer";
import questionReducer from './question/questionReducers'
import { SignupSaga } from "./signup/UserSaga";
import { loginSaga } from "./login/loginSaga";
import { questionSaga } from "./question/questionSaga";

const sagaMiddleware = createSagaMiddleware();

// Root Saga
function* rootSaga() {
    yield all([
        SignupSaga(),
        loginSaga(),
        questionSaga(),
    ]);
}

// Combine Reducers
const rootReducer = combineReducers({
    signupUsers:signupReducer,
    loginUsers:loginReducer,
    questions:questionReducer,
});

// Configure Store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run Saga Middleware
sagaMiddleware.run(rootSaga);
