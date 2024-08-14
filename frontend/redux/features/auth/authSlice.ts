import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    token: "",
    user: ""
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userRegistration: (state, action) => {
            state.token = action.payload.token
        },
        userLoggedIn: (state, action)=> {
            state.user = action.payload.user,
            state.token = action.payload.accessToken
        },
        userLoggedOut: (state, action) => {
            state.token = "",
            state.user = ""
        }
    }
})

export const {userLoggedIn, userLoggedOut, userRegistration} = authSlice.actions