import { url } from "inspector";
import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: ({ data }) => ({
                url: "http://localhost:5000/api/v1/course/create-course",
                method: "POST",
                body:{ data },
                credentials: "include" as const
                })
        })
    })
})

export const {useCreateCourseMutation} = courseApi