import { apiSlice } from "../api/apiSlice";
import { userRegistration  } from "./authSlice";

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
                url: "http://localhost:5000/api/v1/auth/login",
                method: "POST",
                body: {
                    email,
                    password
                },
            })
        })
    })
});


export const { useRegisterMutation, useActivationMutation } = authApi