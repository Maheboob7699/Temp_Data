
import { createSlice } from "@reduxjs/toolkit";
const loadSignupData = () => JSON.parse(localStorage.getItem("users")) || [];
const saveData = (data) => {
    localStorage.setItem("users", JSON.stringify(data));
}

let initialState = {
    userData: loadSignupData(),
    error: {},
    result:false,
};

const signupReducer = createSlice({
    name: "signup-user",
    initialState,
    reducers: {
        signupButton: (state, action) => {
            const { name, email, password } = action.payload;
            if (name === "" && email === "" && password === "") {
                alert("all fields are required")
                return;
            };

            if (!email.includes("@")) {
                state.error.email = "@ is missing";
                return
            }

            if (!email.includes(".com")) {
                state.error.email = ".com is missing"
            }

            if (password.length < 6) {
                state.error.password = "password must be at least 6 character long";
                return;
            }
            if (!/[a-z]/.test(password)) {
                state.error.password = "Password must contain at least one lowercase letter";
                return;
            }

            if (!/[0-9]/.test(password)) {
                state.error.password = "Password must contain at least one number";
                return;
            }

            if (!/[@$!%*?&]/.test(password)) {
                state.error.password = "Password must contain at least one special character (@, $, !, %, *, ?, &)";
                return;
            }

            else {
                state.userData.push(action.payload);
                saveData(state.userData);
                alert("signup sucessfully");
                 state.result=true;
            }
        },

        clearError: (state, action) => {
            const fieldName = action.payload; 
            if (state.error[fieldName]) {
                delete state.error[fieldName];
            }
        },
    }
})

export const { signupButton, clearError } = signupReducer.actions;
export default signupReducer.reducer;