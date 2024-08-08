// "use client"
import Link from "next/link";
import React from "react";

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/url",
  },
  {
    name: "FAQ",
    url: "/faq  ",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};
const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden 800px:flex">
        {navItemsData &&
          navItemsData.map((data, index) => (
            <Link href={`${data.url}`} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-[#37a39a] text:-[crimson]"
                    : " dark:text-white text-black"
                } text-[15px] px-6 font-Poppins font-[400]`}
              >
                {data.name}
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center py-6">
            {navItemsData &&
              navItemsData.map((data, index) => (
                <Link href={`${data.url}`} key={index} passHref>
                  <span
                    className={`${
                      activeItem === index
                        ? "dark:text-[#37a39a] text:-[crimson]"
                        : " dark:text-white text-black"
                    } block text-[10px] py-6 font-Poppins font-[400]`}
                  >
                    {/* {data.name} */}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavItems;
