import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import avatarImage from "@/public/images/avatarImage.png";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "@/app/styles/style";
<<<<<<< HEAD
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";

=======
import { useEditProfileMutation, useUpdateAvatarMutation } from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";


>>>>>>> origin/frontend
type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);
<<<<<<< HEAD
  /* The code snippet you provided is managing the state of `loadUser` 
using the `useState` hook and a custom hook `useLoadUserQuery`.
 Here's what each part is doing: */
  const [loadUser, setLoadUser] = useState(false);

  /* The line `const {} = useLoadUserQuery(undefined, {skip: loadUser ? false : true})` in the provided
TypeScript React code snippet is using the `useLoadUserQuery` custom hook to fetch user data. Here's
what it is doing: */
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: success, error: updateProfileError }] =useEditProfileMutation();
  // console.log(editProfile)

  const imageHandler = async (e: any) => {
    const file = e.target.file[0];

    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true);
    }
    if (success) {
      toast.success("Profile updated successfully....");
    }

    if (error || updateProfileError) {
      console.log(error, updateProfileError);
    }
  }, [error, isSuccess, updateProfileError, success]);

  /**
   * The `handleSubmit` function in TypeScript React is used to handle form submissions by editing a
   * user's name and not email since we are getting email from a defferent state if the name is not empty.
   **/
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      await editProfile({
        name: name,
=======
/* The code snippet you provided is managing the state of `loadUser` 
using the `useState` hook and a custom hook `useLoadUserQuery`.
 Here's what each part is doing: */
  const [loadUser, setLoadUser] = useState(false);
  
/* The line `const {} = useLoadUserQuery(undefined, {skip: loadUser ? false : true})` in the provided
TypeScript React code snippet is using the `useLoadUserQuery` custom hook to fetch user data. Here's
what it is doing: */
  const {} = useLoadUserQuery(undefined, {skip: loadUser ? false : true})
const [updateAvatar, {isSuccess, error}] = useUpdateAvatarMutation();
const [editProfile, {isSuccess:success, error:isError}] = useUpdateAvatarMutation();

  const imageHandler = async (e: any) => {
    const file = e.target.file[0]

    const fileReader = new FileReader()

    fileReader.onload= () => {
      if(fileReader.readyState === 2){
        const avatar = fileReader.result
        updateAvatar({
          avatar
        })
      }
    }
    fileReader.readAsDataURL(e.target.files[0])
  };

  useEffect(()=> {
    if(isSuccess || success){
      setLoadUser(true)
    }
    if(success){
      toast.success("Profile updated successfully....")
    }

    if(error || isError){
      console.log(error)
    }
  }, [error, isSuccess, isError, success])

/**
 * The `handleSubmit` function in TypeScript React is used to handle form submissions by editing a
 * user's name and not email since we are getting email from a defferent state if the name is not empty.
 **/
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(name !== ""){
      await editProfile({
        name,
>>>>>>> origin/frontend
        /* The line `email: user.email` in the `editProfile` function call is passing the `email`
        property from the `user` object as a parameter to the `editProfile` function. This is used
        to update the user's profile with the existing email address associated with the user. The
        `email` property is being used to ensure that the email address remains unchanged during the
        profile update process. */
<<<<<<< HEAD
        email: user.email,
      });
    }
  };

=======
        email: user.email
      })
    }
  };
  
>>>>>>> origin/frontend
  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            src={
              user.avatar || avatar ? user.avatar.url || avatar : avatarImage
            }
            alt=""
            height={120}
            width={120}
            className="w-[120px] h-[120px] cursor-pointer border-[#37a39a] rounded-full"
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png, image/jpg, image/jpeg, image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-1" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-[100%]">
<<<<<<< HEAD
              <label className="block pb-2">Full Name</label>
              <input
=======
                <label className="block pb-2">Full Name</label>
                <input
>>>>>>> origin/frontend
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
<<<<<<< HEAD
              />
            </div>
            <div className="w-[100%] pt-2">
              <label className="block pb-2">Email Address</label>
              <input
                type="text"
                required
                readOnly
                value={user?.email}
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
              />
            </div>
            <input
              type="submit"
              required
              value="Update Info"
              className="w-[100%] h-[40px] border 800px:w-[250px]  border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer text-[25px]"
            />
=======
                />
            </div>
            <div className="w-[100%] pt-2">
                <label className="block pb-2">Email Address</label>
                <input
                type="text"
                required
                readOnly
                value={user?.name}
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                />
            </div>
          <input
            type="submit"
            required
            value="Update"
            className={`w-full 800px:w-[250px] h-[40px] border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
          />
>>>>>>> origin/frontend
          </div>
        </form>
        <br />
      </div>
    </>
  );
};

export default ProfileInfo;
