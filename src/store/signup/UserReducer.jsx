import { createSlice } from "@reduxjs/toolkit";

let initialState = {
   showUser: [],
   error: '',
   uniqueId:0,

}

const signupSlice = createSlice({
   name: "user-signup-data",
   initialState,
   reducers: {
      Fetch_User: (state) => {

      },

      Fetch_Success: (state, action) => {
         state.showUser = action.payload;
      },

      Fetch_Error: (state, action) => {
         state.error = action.payload;
      },

      Fetch_Add_User: (state, action) => {
   
      },
      
      Add_User: (state, action) => {
         const { id, ...newUser } = action.payload; 
         const isUserExist = state.showUser.some(user => user.email === newUser.email);
      
         if (!isUserExist) {
            state.showUser = [...state.showUser,action.payload]
            state.uniqueId+=1;
         }
      }
   }


})

export const { Fetch_User, Fetch_Success, Fetch_Error, Fetch_Add_User, Add_User } = signupSlice.actions;
export default signupSlice.reducer;