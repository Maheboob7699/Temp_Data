import { put, takeLatest } from "redux-saga/effects";
import { Fetch_Question, Fetch_Question_Success, Fetch_Question_Error } from "./questionReducers";
import axios from "axios";

// Function to select 10 unique random questions
const getRandomQuestions = (questions) => {
    let randomQuestion = [];
    let usedIndices = new Set();

    for (let i = 0; i < 10; i++) {
        let randomNumber = Math.floor(Math.random() * questions.length);

        if (usedIndices.has(randomNumber)) {
            i--; // Retry if duplicate index
        } else {
            usedIndices.add(randomNumber);

            let questandAns = {
                ques: questions[randomNumber].ques,
                options: questions[randomNumber].options,
                answer: questions[randomNumber].answer
            };
            randomQuestion.push(questandAns);
        }
    }

    return randomQuestion;
};

function* quizzQuestionSaga() {
    try {
        const { data } = yield axios.get('https://json-server-2-aggn.onrender.com/questions');

        if (data.length >= 10) {
            let randomQuestions = getRandomQuestions(data);
            yield put(Fetch_Question_Success(randomQuestions));
        } else {
            yield put(Fetch_Question_Error("Not enough questions available"));
        }
    } catch (err) {
        yield put(Fetch_Question_Error(err.message));
    }
}

export function* questionSaga() {
    yield takeLatest(Fetch_Question.type, quizzQuestionSaga);
}
