import { createSlice } from "@reduxjs/toolkit";

let initialState ={
    question:[],
    error:'',
}

const questionSlice = createSlice({
    name:'question-question',
    initialState,
    reducers:{
        Fetch_Question:(state,action)=>{
            
        },
        Fetch_Question_Success:(state,action)=>{
            state.question = action.payload
        },
        Fetch_Question_Error:(state,action)=>{
            state.error = action.payload
        },

    }
})
export const {Fetch_Question,Fetch_Question_Success,Fetch_Question_Error} = questionSlice.actions;
export default questionSlice.reducer;