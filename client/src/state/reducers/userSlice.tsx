import { createSlice } from "@reduxjs/toolkit";
import { StateProps } from "../../../types/dataTypes";

const initialState: StateProps = {
    currentUser: null,
    error: null,
    loading: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.error = null;
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;      
        }, 
        signInFail: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateUserStart: (state) => {
            state.loading = true;
        }, 
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.error = null;
            state.loading = false;
        },
        updateUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserFail: (state, action) => {
            state.error = action.payload;
            state.loading = false
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.error = null;
            state.loading = false;
        },
        signoutUserStart: (state) => {
            state.loading = true;
        },
        signoutUserFail: (state, action) => {
            state.error = action.payload;
            state.loading = false
        },
        signoutUserSuccess: (state) => {
            state.currentUser = null;
            state.error = null;
            state.loading = false;
        }
    }
})

export const {
  signInStart,
  signInFail,
  signInSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFail,
  deleteUserStart,
  deleteUserSuccess,
  signoutUserFail,
  signoutUserStart,
  signoutUserSuccess,
} = userSlice.actions;
export default userSlice.reducer;