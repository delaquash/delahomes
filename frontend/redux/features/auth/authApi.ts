import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // endpoints here
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
<<<<<<< HEAD
        url: "http://localhost:7000/api/v1/auth/registeruser",
=======
        url: "http://localhost:5000/api/v1/auth/registeruser",
>>>>>>> origin/frontend
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
<<<<<<< HEAD
        url: "http://localhost:7000/api/v1/auth/activate-user",
=======
        url: "http://localhost:5000/api/v1/auth/activate-user",
>>>>>>> origin/frontend
        method: "POST",
        body: {
          activation_token,
          activation_code,
        },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
<<<<<<< HEAD
        url: "http://localhost:7000/api/v1/auth/signin",
=======
        url: "http://localhost:5000/api/v1/auth/signin",
>>>>>>> origin/frontend
        method: "POST",
        body: {
          email,
          password,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logout: builder.query({
      query: () => ({
<<<<<<< HEAD
        url: "http://localhost:7000/api/v1/auth/signout",
=======
        url: "http://localhost:5000/api/v1/auth/signout",
>>>>>>> origin/frontend
        method: "GET",
        credentials: "include" as const
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch }){
        try {

          dispatch(
           userLoggedOut()
          );
        } catch (error) {
          console.log(error)
        }
      } 
    }),
    socialAuth: builder.mutation({
      query: ({ email, name, avatar }) => ({
<<<<<<< HEAD
        url: "http://localhost:7000/api/v1/auth/social-auth",
=======
        url: "http://localhost:5000/api/v1/auth/social-auth",
>>>>>>> origin/frontend
        method: "POST",
        body: {
          email,
          name,
          avatar,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useLogoutQuery
} = authApi;
