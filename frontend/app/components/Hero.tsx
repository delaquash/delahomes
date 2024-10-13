"use client"
import { useGetHeroDataQuery } from "@/redux/features/layout/layout";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { BiSearch } from "react-icons/bi";
// import CustomParticles from "../utils/CustomParticles";

type Props = {};

const Hero: FC<Props> = (props) => {
  const {data, refetch} = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true 
  })

  return (
    <div className="w-full 1000px:flex items-center">
      {/* css not finished */}
      <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1100px:w-[600px] h-[50vh] w-[50vh] hero_animation"></div>
      <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
        <Image
          // image not added
          src={data?.layout?.banner?.image?.url}
          width={500}
          height={500}
          priority
          alt=""
          className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
        />
      </div>

      <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
        {/* css not finished */}
        <h2 className="dark:text-white text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[58%]">
          {/* Improve Your online Learning Experience better Instantly.
           */}
           {data?.layout?.banner?.title}
        </h2>
        <br />
        <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%]">
          {/* We have 40k+ Online courses & 500k+ Online registered student. Find
          your desired courses from them */}
          {data?.layout?.banner?.subTitle}
        </p>
        <br />
        <br />
        <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative">
          <input
            type="search"
            placeholder="Search Courses..."
            className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004c] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin"
          />
          <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]">
            <BiSearch className="text-white" size={30} />
          </div>
        </div>
        <br />
        <br />
        <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center pt-[10px]">
          <Image 
                alt=""
                height={40}
                width={50}
                src={require("../../public/images/headshot 1.jpg")}
                className="rounded-full"
            />
          <Image 
                alt=""
                height={40}
                width={50}
                src={require("../../public/images/Headshot 2.jpg")}
                className="rounded-full ml-[-20px]"
            />
            <Image 
                alt=""
                height={50}
                width={55}
                src={require("../../public/images/headshot 3.jpg")}
                className="rounded-full ml-[-20px]"
            />      
          <p className="font-Josefin dark:text-[#edfff4] text-[#000000c7] 1000px:pl-3 text-[20px] font-[600]">
            500k+ People already trusted us.{" "}
            <Link
              href="/courses"
              className="dark:text-[#46e254] text-[crimson]"
            >
              View Courses
            </Link>
          </p>
        </div>
        <br />
      </div>
    </div>


  );
};

export default Hero;
