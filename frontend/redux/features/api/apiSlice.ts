import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  }),
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: (data) => ({
<<<<<<< HEAD
        url: "http://localhost:7000/api/v1/user/refresh_token",
=======
        url: "http://localhost:5000/api/v1/user/refresh_token",
>>>>>>> origin/frontend
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    loadUser: builder.query({
      query: (data) => ({
<<<<<<< HEAD
        url: "http://localhost:7000/api/v1/user/me",
=======
        url: "http://localhost:5000/api/v1/user/me",
>>>>>>> origin/frontend
        method: "GET",
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

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;
