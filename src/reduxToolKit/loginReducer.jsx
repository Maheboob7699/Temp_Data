import { createSlice } from "@reduxjs/toolkit";

const loadSignupData = JSON.parse(localStorage.getItem("users")) || [];
const savedUniqueId = JSON.parse(localStorage.getItem("uniqueId")) || 0;
const savedUserDetails = JSON.parse(localStorage.getItem("userDetails")) || [];

let initialState = {
    singnupData: loadSignupData,
    loginStore: [],
    error: {
        email: "",
        password: "",
    },
    uniqueId:savedUniqueId,
    userDetails:savedUserDetails,
    result: false,
};

const loginReducer = createSlice({
    name: "login-user",
    initialState,
    reducers: {
        loginButton: (state, action) => {
            const { email, password } = action.payload;
            state.error.email = "";
            state.error.password = "";

            if (email === "" || password === "") {
                alert("All fields are required");
                return;
            }

            if (!email.includes("@")) {
                state.error.email = "@ is missing";
                return;
            }
            if (!email.includes(".com")) {
                state.error.email = ".com is missing";
                return;
            }
            if (password.length < 6) {
                state.error.password = "Password must be at least 6 characters long";
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

            let userExists = state.singnupData.find(
                (signupUser) => signupUser.email === email && signupUser.password === password
            );

            if (userExists) {
                alert("Login successfully!");
                let existingUser = state.userDetails.find(user => user.email === userExists.email);

                if (!existingUser) {
                    if (state.userDetails.length === 0) {
                        state.uniqueId = 0;  
                    } else {
                        state.uniqueId += 1;
                    }

                    localStorage.setItem("uniqueId", JSON.stringify(state.uniqueId));

                    let newUser = {
                        name: userExists.name,
                        email: userExists.email,
                        score: 0,
                        id: state.uniqueId,
                        userData: [],
                    };

                    let updatedUserDetails = [...state.userDetails, newUser];
                    localStorage.setItem("userDetails", JSON.stringify(updatedUserDetails));

                    state.userDetails.push(newUser);
                }

                state.result = true;
            } else {
                alert("Invalid email or password!");
                state.result = false;
            }
        },

        checkError: (state, action) => {
            let field = action.payload;
            if (state.error[field]) {
                delete state.error[field];
            }
        }
    }
});

export const { loginButton, checkError } = loginReducer.actions;
export default loginReducer.reducer;
