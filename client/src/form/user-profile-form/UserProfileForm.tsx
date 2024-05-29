import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { User } from "@/AllTypes"
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  addressLine1: z.string().min(1, "Address Line 1 is required"),
});

type UseFormData = z.infer<typeof formSchema>;

type Props = {
  CurrentUser: User
  /* The `onSave` prop in the `Props` type is defining a function that takes an argument of type
    `UseFormData` and returns `void`. This means that the `onSave` function passed to the
    `UserProfileForm` component should accept an object that matches the shape defined by the
    `UseFormData` type and does not return any value (void). This function is typically used to
    handle saving the user profile data entered in the form. */
  onSave: (userprofileData: UseFormData) => void;
  isLoading: boolean;
};

const UserProfileForm = ({ isLoading, onSave, CurrentUser }: Props) => {
  /* This code snippet is using the `useForm` hook from the `react-hook-form` library to create a form
  instance for the UserProfileForm component. Here's what each part of the `useForm` hook
  configuration is doing: */
  const form = useForm<UseFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: CurrentUser
  });

  useEffect(()=> {
    form.reset(CurrentUser)
  }, [CurrentUser, form])
  return (
    <Form {...form}>
      <form
        className="space-y-4 bg-gray-50 rounded-lg md:p-10"
        onSubmit={form.handleSubmit(onSave)}
      >
        <div>
          <h2 className="font-bold text-2xl">User Profile Form</h2>
          <FormDescription>
            View and Change Your Profile Information
          </FormDescription>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field}  className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field}  className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Address Line</FormLabel>
                <FormControl>
                  <Input {...field}  className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field}  className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {isLoading ? (
            <LoadingButton />
            ) : (   
            <Button className="bg-orange-500" type="submit">
                Submit
            </Button>
        )}
      </form>
    </Form>
  );
};

export default UserProfileForm;