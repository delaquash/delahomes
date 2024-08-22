import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import avatarImage from "@/public/images/avatarImage.png";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "@/app/styles/style";
import { useUpdateAvatarMutation } from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";


type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);
  const [loadUser, setLoadUser] = useState(false)
  const {} = useLoadUserQuery(undefined, {skip: loadUser ? false : true})
const [updateAvatar, {isSuccess, error}] = useUpdateAvatarMutation()
  const imageHandler = async (e: any) => {
    const file = e.target.file[0]

    const fileReader = new FileReader()

    fileReader.onload= () => {
      if(fileReader.readyState === 2){
        updateAvatar({
          avatar: fileReader.result
        })
      }
    }
  };

  useEffect(()=> {
    if(isSuccess){
      setLoadUser(true)
    }

    if(error){
      console.log(error)
    }
  }, [error, isSuccess])

  const handleSubmit = async (e: any) => {
    console.log("This is handleSubmit");
  };
  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            src={
              user.avatar || avatar ? user.avatar.url || avatar : avatarImage
            }
            alt=""
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
                <label className="block pb-2">Full Name</label>
                <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
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
          </div>
        </form>
        <br />
      </div>
    </>
  );
};

export default ProfileInfo;
