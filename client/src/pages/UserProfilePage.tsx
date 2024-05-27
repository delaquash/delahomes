import UserProfileForm from "@/form/user-profile-form/UserProfileForm"
import { useUpdateMyUser, useGetMyUser } from "@/helper/myUserApi";

const UserProfilePage = () => {

  const { CurrentUser, isLoading: isGetLoading } = useGetMyUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

  if (isGetLoading) {
    return <span>Loading...</span>;
  }

  if (!CurrentUser) {
    return <span>Unable to load user profile</span>;
  }
  return (
    <UserProfileForm 
        CurrentUser={CurrentUser}
        isLoading={isUpdateLoading} 
        onSave={updateUser}
    />
  )
}

export default UserProfilePage

