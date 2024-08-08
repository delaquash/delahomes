"use client";
import Link from "next/link";
import React, { FC, useState } from "react";
import NavItems from "./NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";

type Props = {
  open: Boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
};

const Header: FC<Props> = ({ activeItem, setOpen }) => {
  const [active, setActive] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);

  /* This code snippet is adding an event listener to the `scroll` event on the `window` object. 
  When the user scrolls the page, the event listener checks the `window.scrollY` property, which
  represents the vertical scroll position of the window. */
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (e:any) => {
    if(e.target.id === "screen"){
        setOpenSideBar(false)
    }
  }
  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
        }`}
      >
        <div className="m-auto py-2 h-full w-[95%] 800px:w-[92%]">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
                href={"/"}
              >
                DelaCourse LMS
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/* for mobile */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSideBar(true)}
                />
              </div>
              <HiOutlineUserCircle
                size={25}
                className="cursor-pointer dark:text-white text-black"
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
        </div>
        {/* mobile navbar */}
            {openSideBar && (
                <div 
                    className="fixed top-0 left-0 w-full h-screen z-[99999] bg-[#0000024] dark:bg-[unset]"
                    onClick={handleClose}
                    id="screen"
                >
                    <div className="fixed w-[70%] h-screen bg-white z-[999999999] dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
                        <NavItems 
                            activeItem={activeItem}
                            isMobile={true}
                        />
                        <HiOutlineUserCircle
                            size={25}
                            className="cursor-pointer ml-5 my-2 text-black dark:text-white"
                            onClick={()=> setOpen(true)}
                        />
                        <br/>
                        <br/>
                        <p className="text-[16px] dark:text-white text-black px-2 pl-5">
                          Copyright © 2024 DelaCourse Inc.
                        </p>
                    </div>
                </div>
            )}
      </div>
    </div>
  );
};

export default Header;
