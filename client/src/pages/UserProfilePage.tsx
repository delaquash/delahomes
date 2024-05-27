import UserProfileForm from "@/form/user-profile-form/UserProfileForm"
import { useUpdateMyUser } from "@/helper/myUserApi";

const UserProfilePage = () => {

  // const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

  // if (isGetLoading) {
  //   return <span>Loading...</span>;
  // }

  // if (!currentUser) {
  //   return <span>Unable to load user profile</span>;
  // }
  return (
    <UserProfileForm 
        isLoading={isUpdateLoading} 
        onSave={updateUser}
    />
  )
}

export default UserProfilePage

