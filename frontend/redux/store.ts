"use client"
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import  authSlice  from "./features/auth/authSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice
    },
    devTools: false,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

const initializeApp = async() => {
<<<<<<< HEAD
    // await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, {forceRefetch: true}));
    await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, {forceRefetch: true}))
}

// Define RootState to reflect the overall state structure
// export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch if needed for typing dispatch
export type AppDispatch = typeof store.dispatch;


=======
    await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, {forceRefetch: true}));
    await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, {forceRefetch: true}))
}

>>>>>>> origin/frontend
initializeApp();