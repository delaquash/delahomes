import Image from 'next/image';
import React from 'react';
import avatar from "../../../public/images/avatar.png";

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
                src={user.avatar || avatar ? user.avatar || avatar:avatar }
                alt=''
            />
        </div>
    </div>
  )
}

export default SideBarProfile