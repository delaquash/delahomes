import { url } from "inspector";
import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: ( data ) => ({
                url: "http://localhost:7000/api/v1/course/create-course",
                method: "POST",
                body: data ,
                credentials: "include" as const
                })
        }),
        getCourses: builder.query({
            query: () => ({
                url: "http://localhost:7000/api/v1/course/get-admin-all-courses",
                method: "GET",
                credentials: "include" as const
            })
        }),
        deleteCourses: builder.mutation({
            query: ({ id }) => ({
                url: `http://localhost:7000/api/v1/course/delete-course/${id}`,
                method: "DELETE",
                credentials: "include" as const
            }),
        }),
        editCourse: builder.mutation({
            query: ({ id, data }) => ({
                url: `http://localhost:7000/api/v1/course/edit-course/${id}`,
                method: "PUT",
                body: data,
                credentials: "include" as const
            })
        }) 
    })
})

export const {useCreateCourseMutation, useGetCoursesQuery, useDeleteCoursesMutation, useEditCourseMutation} = courseApi