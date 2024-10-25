import { apiSlice } from "../api/apiSlice";

export const paymentApi = apiSlice.injectEndpoints({
    endpoints:(builder)=> ({
        // GET STRIPE PUBLISHABLE KEY
        getStripePublishablekey: builder.query({
            query: () => ({
              url: `/stripe-keys`,
              method: "GET",
              credentials: "include" as const,
            }),
          }),
          // CREATE THE PAYMENT
          createPaymentIntent: builder.mutation({
            query: (amount) => ({
              url: "/payment",
              method: "POST",
              body: {
                amount,
              },
              credentials: "include" as const,
            }),
          }),
    })
})
   
export const {useGetStripePublishablekeyQuery, useCreatePaymentIntentMutation} = paymentApi