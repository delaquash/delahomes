import { createSlice, PayloadAction } from "@reduxjs/toolkit";

<<<<<<< HEAD
// Define the structure of the authentication state
export interface AuthState {
    token: string;
    user: string;
}

// Initial state for authentication
=======

>>>>>>> origin/frontend
const initialState = {
    token: "",
    user: ""
}

<<<<<<< HEAD
=======

>>>>>>> origin/frontend
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userRegistration: (state, action:PayloadAction<{token: string}>) => {
            state.token = action.payload.token
        },
        userLoggedIn: (state, action:PayloadAction<{accessToken: string, user: string}>)=> {
            state.user = action.payload.user,
            state.token = action.payload.accessToken
        },
        userLoggedOut: (state) => {
            state.token = "",
            state.user = ""
        }
    }
})

export const {userLoggedIn, userLoggedOut, userRegistration} = authSlice.actions
export default authSlice.reducer