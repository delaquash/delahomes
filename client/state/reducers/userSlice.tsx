import { createSlice } from "@reduxjs/toolkit";

interface StateProp {
    currentUser: string | null;
    error:string | null;
    loading: boolean 
}
const initialState: StateProp = {
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
        }
    }
})

export const { signInStart, signInFail, signInSuccess } = userSlice.actions
export default userSlice.reducer;