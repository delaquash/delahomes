import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getAllOrders: builder.query({
            query:(type)=> ({
                url: `/order/get-all-order`,
                method: "GET",
                credentials: "include" as const
            })
        }),
        createOrder: builder.mutation({
            query:({ courseId, payment_info }) => ({
                url: "",
                method: "POST",
                body: { courseId, payment_info },
                credentials: "include" as const
            })
        })
    })

})

export const { useGetAllOrdersQuery,useCreateOrderMutation } = ordersApi