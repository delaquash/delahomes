"use client"
import React, { FC, useState } from "react";

type Props = {
    open: Boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
}



const Header:FC<Props> = () => {
    const [active, setActive] = useState(false)
    const [openSideBar, setOpenSideBar] = useState(false)

  /* This code snippet is adding an event listener to the `scroll` event on the `window` object. 
  When the user scrolls the page, the event listener checks the `window.scrollY` property, which
  represents the vertical scroll position of the window. */
    if(typeof window !== "undefined"){
        window.addEventListener("scroll", ()=> {
            if(window.scrollY > 85) {
                setActive(true)
            } else {
                setActive(false)
            }
        })
    }
    return (
        <div className="w-full relative">
            <div className={`${active 
                ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500" 
                : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"}`}
            >

            </div>
            Header
        </div>
    )
}

export default Header;