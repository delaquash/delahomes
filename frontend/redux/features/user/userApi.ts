import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateAvatar: builder.mutation({
            query: (avatar) => ({
                url: "http://localhost:5000/api/v1/user/update-profile-avatar",
                method: "PUT",
                body: {avatar},
                credentials: "include" as const
            })
        }),
        editProfile: builder.mutation({
            query: ({ name, email }) => ({
                url: "http://localhost:5000/api/v1/user/update-user-info",
                method: "PUT",
                body: JSON.stringify({ name, email }), // Ensure JSON.stringify is used
                headers: {
                  'Content-Type': 'application/json', // Explicitly set Content-Type header
                },
                credentials: "include" as const
            })
        }),
        updatePassword: builder.mutation({
            query:({ newPassword, oldPassword }) => ({
                url: "http://localhost:5000/api/v1/user/update-user-password",
                method: "PUT",
                body: JSON.stringify({ newPassword, oldPassword }),
                headers: {
                    'Content-Type': 'application/json', // Explicitly set Content-Type header
                  },
                credentials: "include" as const
            })
        }),
        getAllUser: builder.query({
            query: () => ({
                url: "http://localhost:5000/api/v1/user/get-all-User",   
                method: "GET",
                credentials: "include" as const
                })
        })
    })
});
export const {useGetAllUserQuery ,useUpdateAvatarMutation,useEditProfileMutation, useUpdatePasswordMutation } = userApi