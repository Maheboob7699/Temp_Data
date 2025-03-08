import { createSlice } from "@reduxjs/toolkit";
import { quizzRandomQuestion } from "./quizzQuestion";

// Retrieve stored user data from local storage
let localUser = JSON.parse(localStorage.getItem("userDetails")) || [];
console.log(localUser);

const savedUniqueId = JSON.parse(localStorage.getItem("uniqueId")) || 0;
console.log("unique id",savedUniqueId);


let initialState = {
    quizzQuestions:quizzRandomQuestion,
    currentUser:localUser,
    quizzIndex: 0,
    currentIndex:savedUniqueId,
    score: 0,
    selectedAnswer:[],
    previous: '',
    progressBar:10,
    leaderboardPage:false,
};

const quizzReducer = createSlice({
    name: "quizz",
    initialState,

    reducers: {
        nextButton: (state) => {
            if (state.quizzIndex < state.quizzQuestions.length - 1) {
                const selected = state.selectedAnswer.find(item => item.id === state.quizzIndex);

                if (selected) {
                    state.quizzIndex += 1;
                    state.clickOption = false;
                    state.progressBar += 10;
                } else {
                    alert("Please select an option");
                }
            }
            else if (state.quizzIndex === state.quizzQuestions.length - 1) {
                alert("Are you sure you want to submit?");

                const currentUserIndex = state.currentUser.findIndex(user => user.id === state.currentIndex);

                if (currentUserIndex !== -1) {
                    state.currentUser = state.currentUser.map((item) => {
                        if (item.id === state.currentIndex) {
                            return {
                                ...item,
                                score: item.score === 0 || item.score < state.score ? item.score = state.score : item.score, 
                            };
                
                        }
                        return item;
                    });
                
                    localStorage.setItem("userDetails", JSON.stringify(state.currentUser)); 
                }
                
                state.leaderboardPage = true;
            }
        },

        optionButton: (state, action) => {
            const duplicateIndex = state.selectedAnswer.findIndex((item) => item.id === state.quizzIndex);

            if (duplicateIndex !== -1) {
                state.selectedAnswer[duplicateIndex] = {
                    id: state.quizzIndex,
                    answer: action.payload,
                };
            } else {
                state.selectedAnswer.push({
                    id: state.quizzIndex,
                    answer: action.payload,
                });
            }

            if (action.payload === state.quizzQuestions[state.quizzIndex].answer) {
                state.score += 10;
            }

            state.previous = "";
        },

        previousButton: (state) => {
            if (state.quizzIndex > 0) {
                state.quizzIndex -= 1;
                state.progressBar -= 10;

                const selected = state.selectedAnswer.find((item)=>
                    item.id === state.quizzIndex);
                if (selected) {
                    state.previous = selected.answer;
                }
            }
        }
    }
});

export const { nextButton, optionButton, previousButton } = quizzReducer.actions;
export default quizzReducer.reducer;
