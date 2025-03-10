import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loginUser: [],
};

const loginSlice = createSlice({
    name: "login-user",
    initialState,
    reducers: {
        Fetch_Login: (state, action) => { },

        Fetch_Login_Sucess: (state, action) => {
            state.loginUser = action.payload;
        },

        Fetch_Login_Add: (state, action) => {
            
        },
        
        Login_Add:(state,action)=>{
            state.loginUser =[...state.loginUser,action.payload];
        },

        Fetch_Updated_User_Data:(state,action)=>{

        },

        Update_User_Data: (state, action) => {
            console.log("action .payload data",action.payload);
            const {uniqueId, question, selectedAnswers, score } = action.payload;
            console.log("selected answer",selectedAnswers);
            console.log('question is',question);
            console.log("score is",score);
            
            
            
            state.loginUser = state.loginUser.map(user =>
                user.id === uniqueId
                    ? {
                        ...user,
                        score: Math.max(user.score, score),
                        user: [
                            ...user.user,
                            {
                               question:question,
                               selectedAnswers:selectedAnswers,
                               score: score
                            }
                        ]
                    }
                    : user
            );
        },
    }
});

export const { Fetch_Login,Login_Add, Fetch_Login_Add, Fetch_Login_Sucess, Update_User_Score, Fetch_Updated_User_Data,Update_User_Data } = loginSlice.actions;
export default loginSlice.reducer;
