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
        }),
        getAllCourse: builder.query({
            query: () => ({
                url: "http://localhost:7000/api/v1/course/get-courses",
                method: "GET",
                credentials: "include" as const
            })
        }),
        getSingleCourseDetails: builder.query({
            query:({ id })=> ({
                url: `http://localhost:7000/api/v1/course/single-course/${id}`,
                method: "GET",
                credentials: "include" as const
            })
        })
    })
})

export const {useCreateCourseMutation, useGetSingleCourseDetailsQuery, useGetAllCourseQuery, useGetCoursesQuery, useDeleteCoursesMutation, useEditCourseMutation} = courseApi