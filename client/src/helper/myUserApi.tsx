import { useMutation } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface MyUserProps {
    auth0Id : string;
    email: string
}

export const useCreateUserRequest = () => {
 const createNewUserRequest = async (user: MyUserProps) => {
        const res = await fetch (`${API_BASE_URL}/user`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        if(!res.ok){
            throw new Error("User not created...")
        }
    }
    const { mutateAsync:createUser, isLoading, isError, isSuccess} = useMutation(createNewUserRequest);
    return {
        createUser, isLoading, isError, isSuccess
    }
}
