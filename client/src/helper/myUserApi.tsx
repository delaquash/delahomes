import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface MyUserProps {
    auth0Id : string;
    email: string
}

export const useCreateUserRequest = () => {
    const {getAccessTokenSilently} = useAuth0()
 const createNewUserRequest = async (user: MyUserProps) => {
    const accessToken = await getAccessTokenSilently();
        const res = await fetch (`${API_BASE_URL}/api/v1/user`,{
            method: "POST",
            headers: {
                Authorization:  `Bearer ${accessToken}`,
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

type UpdateMyUserRequest = {
    name: string;
    email: string;
    city: string;
    addressLine: string;
}

export const useUpdateMyUserProfile =() => {
    const { getAccessTokenSilently } = useAuth0()

    const updateMyUserProfileRequest =  async (formData: UpdateMyUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const res = await fetch (`${API_BASE_URL}/api/v1/user`, {
            method: "PUT",
            headers: {
                Authorization:  `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        if(!res.ok){
            throw new Error("User not created...")
        }
        return res.json()
 
    }
}