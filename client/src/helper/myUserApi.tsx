import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { User }  from "@/AllTypes"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface MyUserProps {
    auth0Id : string;
    email: string
}

export const useCreateUserRequest = () => {
    const {getAccessTokenSilently} = useAuth0();
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
    console.log(createUser)
}

type UpdateMyUserRequest = {
    name: string;
    email?: string;
    city: string;
    addressLine1: string;
}

export const useUpdateMyUser =() => {
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
        console.log(res.json())
    }
    const { mutateAsync:updateUser, isLoading, isError, error, reset, isSuccess} = useMutation(updateMyUserProfileRequest);
    if(isSuccess){
        toast.success("User updated successfully.")
    }

    if(error) {
        toast.error(error.toString())
        reset()
    }
    return {
        updateUser, isLoading, isError, isSuccess, error, reset,
    }
}


export const useGetMyUser = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getMyUserProfile = async (): Promise<User> => {
        const accessToken = getAccessTokenSilently()
        console.log("Get User Token", accessToken)
        const res = await fetch (`${API_BASE_URL}/api/v1/user`, {
            method: "GET",
            headers: {
                Authorization:  `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        })
        if(!res.ok){
            throw new Error("Failed to fetch User")
        }
        return res.json()
    }

    const {data: CurrentUser, isLoading, error, } = useQuery("fetchMyCurrentUser", getMyUserProfile)

    if(error) {
        toast.error(error.toString())
    }
    return { CurrentUser, isLoading}
}