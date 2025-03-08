import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import signupReducer from  "./signupReducer";
import loginReducer from "./loginReducer";
import quizzReducer from "./quizzReducer"

const sagaMiddleware = applyMiddleware();
export const store =configureStore({
    reducer:{
        signupData:signupReducer,
        loginData: loginReducer,
        quizzData:quizzReducer,
    }
})