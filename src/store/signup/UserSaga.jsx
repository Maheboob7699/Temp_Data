
import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { Add_User, Fetch_Add_User, Fetch_Error, Fetch_Success, Fetch_User } from "./UserReducer";

function* fetchUserSaga() {
    try {
        let response = yield axios.get('https://json-server-2-aggn.onrender.com/Users');  
        yield put(Fetch_Success(response.data));  
    } catch (error) {
        yield put(Fetch_Error(error.message));  
    }
}

function* AddUserSaga(action) {
    try {
        let response = yield axios.post('https://json-server-2-aggn.onrender.com/Users', action.payload, {
            headers: { "Content-Type": "application/json" }
        });
        yield put(Add_User(response.data));

    } catch (error) {
        yield put(Fetch_Error(error.message));
    }
}

// function* AddUserSaga(data){
//     yield put(Add_User(data.payload))
// }


export function* SignupSaga() {
    yield takeLatest(Fetch_User.type, fetchUserSaga);
    yield takeLatest(Fetch_Add_User.type,AddUserSaga)
}
