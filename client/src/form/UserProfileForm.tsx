import { z } from "zod";

const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1, "Name is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    addressLine1: z.string().min(1, "Address Line 1 is required"),
})

type UseFormSchema = z.infer<typeof formSchema>