import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";


const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1, "Name is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    addressLine1: z.string().min(1, "Address Line 1 is required"),
})

type UseFormData = z.infer<typeof formSchema>;

type Props = {
    /* The `onSave` prop in the `Props` type is defining a function that takes an argument of type
    `UseFormData` and returns `void`. This means that the `onSave` function passed to the
    `UserProfileForm` component should accept an object that matches the shape defined by the
    `UseFormData` type and does not return any value (void). This function is typically used to
    handle saving the user profile data entered in the form. */
    onSave: (userprofileData: UseFormData) => void;
    isLoading: boolean;
}

const UserProfileForm = ({ isLoading, onSave }: Props) => {
    const form = useForm<UseFormData>({
        resolver: zodResolver(formSchema)
    });
    return (
        <Form {...form}>
            <form 
                className="space-y-4 bg-gray-50 rounded-lg md:p-10"
                onSubmit={form.handleSubmit(onSave)}
            >
                <div>
                    <h2 className="font-bold text-2xl">User Profile Form</h2>
                    <FormDescription>
                        
                    </FormDescription>
                </div>
            </form>
        </Form>
    )
}

export default UserProfileForm;


