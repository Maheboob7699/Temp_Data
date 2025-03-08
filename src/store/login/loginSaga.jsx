import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { Fetch_Login,Login_Add, Fetch_Login_Add, Fetch_Login_Sucess,  Fetch_Updated_User_Data,Update_User_Data } from "./loginReducer";

function* fetchLoginSaga() {
    try {
        let response = yield axios.get('https://json-server-2-aggn.onrender.com/userDetails');
        yield put(Fetch_Login_Sucess(response.data));
    } catch (error) {
        console.error("Error fetching login data", error);
    }
}

function* addUserSaga(action) {
    try { 
        let response = yield axios.post('https://json-server-2-aggn.onrender.com/userDetails', action.payload, {
            headers: { "Content-Type": "application/json" }
        });
        yield put(Login_Add(response.data));
    } catch (error) {
        console.error("Error adding user", error);
    }
}

function* updateUserSaga(action) {
    try {
        let { id, question, selectedAnswers, score } = action.payload;

        let response = yield axios.get(`https://json-server-2-aggn.onrender.com/userDetails/${Number(id)}`);
        let existingUser = response.data;
        console.log("existingUser",existingUser);
        

        let updatedUser = {
            ...existingUser,
            score: Math.max(existingUser.score, score),
            user: [
                ...(existingUser.user || []),
                { question:question, selectedAnswers:selectedAnswers,score:score }
            ]
        };

        yield axios.put(`https://json-server-2-aggn.onrender.com/userDetails/${id}`, updatedUser, {
            headers: { "Content-Type": "application/json" }
        });

        yield put(Update_User_Data(updatedUser));
    } catch (error) {
        console.error("Error updating user score",error);
    }
}

export function* loginSaga() {
    yield takeLatest(Fetch_Login.type, fetchLoginSaga);
    yield takeLatest(Fetch_Login_Add.type, addUserSaga);
    yield takeLatest( Fetch_Updated_User_Data.type, updateUserSaga);
}
