import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userRegistration  } from "./authSlice";

type RegistrationResponse = {
    message: string;
    activationToken: string
}

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // endpoints here
        register: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                url: "http://localhost:5000/api/v1/auth/registeruser",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userRegistration({
                            token: result.data.activationToken
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        activation: builder.mutation({
            query:({activation_token, activation_code}) => ({
                url: "http://localhost:5000/api/v1/auth/activate-user",
                method: "POST",
                body: {
                    activation_token, 
                    activation_code
                },
            })
        }),
        login: builder.mutation({
            query:({email, password}) => ({
                url: "http://localhost:5000/api/v1/auth/signin",
                method: "POST",
                body: {
                    email,
                    password
                },
                credentials: "include" as const
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        socialAuth: builder.mutation({
            query:({ email, name, avatar}) => ({
                url: "http://localhost:5000/api/v1/auth/social-auth",
                method: "POST",
                body: {
                    email,
                    name,
                    avatar
                },
                credentials: "include" as const
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
});


export const { useRegisterMutation, useActivationMutation, useLoginMutation } = authApi