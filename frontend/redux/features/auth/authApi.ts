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
                url: "registeruser",
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
                url: "activate-usef",
                method: "POST",
                body: {
                    activation_token, 
                    activation_code
                },
            })
        })
    })
});


export const { useRegisterMutation, useActivationMutation } = authApi