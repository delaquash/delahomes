import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateAvatar: builder.mutation({
            query: (avatar) => ({
                url: "/user/update-profile-avatar",
                method: "PUT",
                body: {avatar},
                credentials: "include" as const
            })
        }),
        editProfile: builder.mutation({
            query: ({email, name }) => ({
                url: "/user/updateuser-info",
                method: "PUT",
                body: {email, name},
                credentials: "include" as const
            })
        }),
        updatePassword: builder.mutation({
            query:({ newPassword, oldPassword }) => ({
                url: "/update-user-password",
                method: "PUT",
                body: {newPassword, oldPassword },
                credential: "include" as const
            })
        })
    })
});
export const { useUpdateAvatarMutation,useEditProfileMutation, useUpdatePasswordMutation } = userApi