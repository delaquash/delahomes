"use client"
import React, { useState } from 'react';
import  ThemeSwitcher  from "@/app/utils/ThemeSwitcher";
import { IoMdNotificationsOutline } from "react-icons/io";

type Props = {
    open: boolean,
    setOpen: (open: boolean) => void;
}

const DashboardHeader = ({ open, setOpen }: Props) => {
    

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-6">
        <ThemeSwitcher />
            <div
                onClick={()=> setOpen(!open)}
                className="relative cursor-pointer m-2"
            >
                <IoMdNotificationsOutline 
                    className='text-2xl cursor-pointer dark:text-white text-black'
                />
                <span className="absolute -top-2 -right-2 bg-[#3cccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
                    3
                </span>
            </div>
                {open && (
                    <div className="w-[350px] h-[50vh] dark:bg-[#111C43] bg-white shadow-xl absolute top-16 z-10 rounded">
                        <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
                            Notifications
                        </h5>
                        <div className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#000000f]">
                            <div className="w-full flex items-center justify-between p-2">
                                <p className="text-black dark:text-white">
                                    New Question Received
                                </p>
                                <p className="text-black dark:text-white cursor-pointer">
                                    Mark as read
                                </p>
                            </div>
                            <p className="p-2 text-black dark:text-white">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae omnis ipsa debitis quibusdam labore similique provident? Possimus laborum hic deserunt iste fugit quisquam quidem. Illum architecto corporis illo ducimus officiis.
                            </p>
                            <p className="text-black dark:text-white text-[14px] p-2">
                                5 days ago
                            </p>
                        </div>
                    </div>
                )}
        </div>
    // </div>
  )
}

export default DashboardHeader