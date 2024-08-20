import Image from 'next/image';
import React from 'react';
import avatarImage from "../../../public/images/avatar.png";
import { RiLockPasswordLine } from 'react-icons/ri';
import { SiCoursera } from 'react-icons/si';
import { AiOutlineLogout } from 'react-icons/ai';

type Props = {
    user: any;
    avatar: string | null;
    active: number;
    logoutHandler: any;
    setActive: (active: number) => void
}

const SideBarProfile = ({ user,active,avatar,logoutHandler,setActive }: Props) => {
  return (
    <div className="w-full">
        <div
            onClick={()=> setActive(1)} 
            className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 1 ? "bg-slate-800" : "bg-transparent"}`}
        >
            <Image 
                src={user.avatar || avatar ? user.avatar || avatar:avatarImage }
                alt=''
                className="w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full"
            />
            <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
                My Account
            </h5>
        </div>
        <div
            onClick={()=> setActive(2)} 
            className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 2 ? "bg-slate-800" : "bg-transparent"}`}
        >
            <RiLockPasswordLine size={30} fill='#fff'/>
            <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
                Change Password
            </h5>
        </div>
        <div
            onClick={()=> setActive(3)} 
            className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 3 ? "bg-slate-800" : "bg-transparent"}`}
        >
            <SiCoursera size={30} fill="#fff" />
            <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
                Enrolled Courses
            </h5>
        </div>
        <div
            onClick={()=> logoutHandler()} 
            className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 4 ? "bg-slate-800" : "bg-transparent"}`}
        >
            <AiOutlineLogout size={30} fill="#fff" />
            <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
               Log Out
            </h5>
        </div>
    </div>
  )
}

export default SideBarProfile