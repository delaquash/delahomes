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
        }),
        getCourseContent: builder.query({
            query: (id) => ({
                url: `http://localhost:7000/api/v1/course/user-course-content/${id}`,
                method: "GET",
                credentials: "include" as const
            })
        }),
        addNewQuestion: builder.mutation({
            query: ({ contentID, courseID, question })=> ({
                url: "http://localhost:7000/api/v1/course/add-question",
                method: "POST",
                data: ({ contentID, courseID, question }),
                credentials: "include" as const
            })
        }),
        addNewAnswer: builder.mutation({
            query: ({ answer, contentID, courseID, questionID }) => ({
                url: "http://localhost:7000/api/v1/course/add-answer",
                method: "POST",
                data: ({ answer, contentID, courseID, questionID }),
                credentials: "include" as const
            })
        }),
        addReviewInCourse: builder.mutation({
            query: ({ review, rating, courseId }) => ({
                url: `http://localhost:7000/api/v1/course/add-review/${courseId}`,
                method: "PUT",
                data: ({ review, rating, courseId }),
                credentials: "include" as const
            })
        }),
        addReplyToReview: builder.mutation({
            query: ({ comment, courseID, reviewID }) => ({
                url: "http://localhost:7000/api/v1/course/add-reply",
                method: "POST",
                data: ({ comment, courseID, reviewID }),
                credentials: "include" as const
            })
        })
    })
})

export const {useAddNewAnswerMutation,
    useAddReplyToReviewMutation,
    useAddReviewInCourseMutation,
    useGetCourseContentQuery,
    useAddNewQuestionMutation, 
    useCreateCourseMutation, 
    useGetSingleCourseDetailsQuery, 
    useGetAllCourseQuery,
     useGetCoursesQuery,
      useDeleteCoursesMutation,
       useEditCourseMutation
    } = courseApi