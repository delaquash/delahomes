import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCourseAnalytics: builder.query({
            query: () => ({
                url: "http://localhost:7000/api/v1/analytics/get-user-analytics",
                method: "GET",
                credentials: "include" as const
            })
        }),
        getUserAnalytics: builder.query({
            query:() => ({
                url: "http://localhost:7000/api/v1/analytics/get-course-analytics",
                method: "GET",
                credentials: "include" as const
            })
        }),
        getOrderAnalysis: builder.query({
            query: () => ({
                url: "http://localhost:7000/api/v1/get-order-analytics",
                method: "GET",
                credentials: "include" as const
            })
        })
    })
})

export const { useGetCourseAnalyticsQuery, useGetUserAnalyticsQuery, useGetOrderAnalysisQuery } = analyticsApi