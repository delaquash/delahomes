import { styles } from "@/app/styles/style";
import { useEditHeroDataMutation, useGetHeroDataQuery } from "@/redux/features/layout/layout";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {};

const EditHero = (props: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [editHeroData, { error,isSuccess }] = useEditHeroDataMutation()

  const { data } = useGetHeroDataQuery("Banner");

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner);
    }

    if(isSuccess){
      toast.success("Hero Updated Successfully...")
    }

    if(error) {
      const errorMessage = error as any
      toast.error(errorMessage?.data?.message)
    }
  }, [ data, isSuccess, error ]);

  const handleEdit = () => {};
  return (
    <>
      <div className="w-full 100px:flex items-center">
        <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[500px] 1100px:w-[500px] h-[50vh] w-[50vh] hero_animation rounded-[50%] 1100px:left-[18rem] 1500px:left-[21rem]"></div>
        <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
          <div className="relative flex items-center justify-end">
            <img
              src={image}
              alt=""
              className="1100px:max-w-[90%] w-[90%] object-contain 1500px:max-w-[85%] h-[auto] z-[10]"
            />
            <input
              type="file"
              id="banner"
              accept="image/*"
              className="hidden"
              // onChange={}
            />
            <label htmlFor="banner" className="absolute bottom-0 right-0 z-20">
              <AiOutlineCamera className="dark:text-white text-black text-[18px] cursor-pointer" />
            </label>
          </div>
        </div>

        <div className="100px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
          <textarea
            className="dark:text-white text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[58%]"
            placeholder="Improve Your Online Learning Experience Instantly"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows={4}
          />
          <br />
          <textarea
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            placeholder="We have 40k+ Online courses & 500k+ Online registered student. Find your desired courses from them"
            className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%]"
          ></textarea>
          <br />
          <br />
          <br />
          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
        ${
          data?.layout?.banner?.title !== title ||
          data?.layout?.banner?.SubTitle !== subTitle ||
          data?.layout?.banner?.image?.url !== image
            ? "!cursor-pointer !bg-[#42d383]"
            : "!cursor-not-allowed"
        }`}
            onClick={
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.SubTitle !== subTitle ||
              data?.layout?.banner?.image?.url !== image
                ? handleEdit
                : () => null
            }
          >
            Edit
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHero;
