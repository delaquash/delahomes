import React from "react";
import CoursePlayer from "./CoursePlayer";
import { styles } from "@/app/styles/style";
import Ratings from "@/app/utils/Ratings";
import {IoCheckmarkDoneOutline } from "react-icons/io5"
type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
};

const CoursePreview = ({
  active,
  courseData,
  handleCourseCreate,
  setActive,
}: Props) => {
  const discountedPrice =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100;
    console.log(courseData)
  // console.log(discountedPrice)
  const discountPricePercentage = discountedPrice.toFixed(0);

  const prevButton = () => {
    setActive(active - 1)
  }

  const createCourse = () => {
    handleCourseCreate()
  }


  return (
    <div className="w-[90%] m-auto py-5 mb-3">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>
        <div className="flex items-center">
          <h1 className="pt-5 text-[25px]">
            {courseData?.price === 0 ? "Free" : courseData?.price + "$"}
          </h1>
          <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
            {courseData?.estimatedPrice}$
          </h5>
          <h4 className="pl-5 pt-4 text-[22px]">
            {discountPricePercentage}% Off
          </h4>
        </div>
        <div className="flex items-center">
          <div
            className={`${styles.button} !w-[180px] my-3 font-Poppins !bg-[crimson] cursor-not-allowed`}
          >
            Buy Now {courseData?.price}
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            name=""
            id=""
            placeholder="Discounted code...."
            className={`${styles.input} 1500px:!w-[50%] 1100px:w-[60%] ml-3 !mt-0`}
          />
          <div
            className={`${styles.button} !w-[120px] my-3 ml-4 font-Poppins cursor-pointer`}
          >
            Apply
          </div>
        </div>
        <p className="pb-1">Source Code included</p>
        <p className="pb-1">Full lifetime access</p>
        <p className="pb-1">Certificate of Completion</p>
        <p className="pb-3 800px:pb-1">Premium Support</p>
      </div>
      <div className="w-full">
        <div className="w-full 800px:pr-5">
          <h1 className="font-[600] text-[12px] font-Poppins">
            {courseData?.name}
          </h1>
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center">
              <Ratings rating={0} />
              <h5>0 Reviews</h5>
            </div>
            <h5>0 Students</h5>
          </div>
          <br />
          <h1 className="text-[25px] font-Poppins font-[600]">
            What you will learn from this course?
          </h1>
        </div>
        {courseData?.benefits?.map((item: any, index: number)=> (
            <div className="w-full flex 800px:items-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline size={20} />
                </div>
                <p className="pl-2">{item.title}</p>
            </div>
        ))}
        <br />
        <br />
        {/* course description */}
        <div className="w-full">
            <h1 className="font-Poppins text-[25px] font-[600]">
                Course Details
            </h1>
            <p className="text-[18px] mt-[20px] whitespace-pre-linen w-full overflow-hidden">
            {courseData?.description}
            </p>
        </div>
        <br />
        <br />
            <h1 className="text-[25px] font-Poppins font-[600]">
                What are the prerequisite for starting this course?
            </h1>
            {courseData?.prerequisite?.map((item: any, index: number)=> (
                <div className=" w-full 800px: items-center py-2 flex" key={index}>
                    <div className="w-[15px] mr-1">
                        <IoCheckmarkDoneOutline size={20} />
                    </div>
                    <p className="pl-2">
                        {item.title}
                    </p>
                </div>
            ))}
        <br />
        <br />
        <div className="w-full flex items-center justify-between">
            <div className="w-full 800px:w-[100px] flex items-center 
                h-[40px] bg-[#37a39a] justify-center text-center text-[#fff] rounded mt-4 cursor-pointer"
                onClick={()=> prevButton()}
            >
                Prev
            </div>
            <div className=" w-full 800px:w-[100px] flex justify-center items-center 
                h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-4 cursor-pointer"
                onClick={()=> createCourse()}
            >
                Next
            </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
