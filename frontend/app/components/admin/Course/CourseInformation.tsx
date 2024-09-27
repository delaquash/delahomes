"use client";
import { styles } from "@/app/styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layout";
import { CourseInfo } from "@/types/createCourse";
import React, { useState } from "react";

// Props from courseInfo Component
type Props = {
  courseInfo: CourseInfo;
  setCourseInfo: (courseInfo: CourseInfo) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}: Props) => {
  const [dragging, setDragging] = useState(false);
  const [categories, setCategories] = useState([])
  const { data } = useGetHeroDataQuery("Categories")

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  }
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false)
  }

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if(file) {
        const reader = new FileReader();

        reader.onload = () => {
            setCourseInfo({...courseInfo, thumbnail: reader.result })
        }
        reader.readAsDataURL(file)
    }
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];
     if(file) {
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
            if(reader.readyState === 2) {
                setCourseInfo({...courseInfo, thumbnail: reader.result})
            }
        }
        reader.readAsDataURL(file);
     }   
  }
  return (
    <div className="w-[80%] m-auto mt-24">
      <form className={`${styles.label}`} onSubmit={handleSubmit}>
        <div>
          <label>Course Name</label>
          <input
            type="name"
            name=""
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="MERN STACK LMS Course, AI..."
            className={`${styles.input} rounded-full`}
          />
        </div>
        <br />
        <div className="mb-5">
          <label className={`${styles.label}`}>Course Registration</label>
          <textarea
            placeholder="Write something amazing..."
            name=""
            rows={8}
            cols={80}
            value={courseInfo.description}
            className={`${styles.input} !h-min !py-2`}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          ></textarea>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course price</label>
            <input
              type="number"
              required
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              id="price"
              placeholder="30"
              className={`${styles.input} rounded-full`}
            />
          </div>

          <div className="w-[50%]">
            <label className={`${styles.label}`}>Estimated Course Price</label>
            <input
              type="number"
              required
              name=""
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              placeholder="30"
              className={`${styles.input} rounded-full`}
              id="price"
            />
          </div>
        </div>
        <br />
              <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course level</label>
            <input
              type="text"
              required
              value={courseInfo.level}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              id="level"
              placeholder="beginner/intermediate/expert"
              className={`${styles.input} rounded-full`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label} w-[50%]`}>Demo Url</label>
            <input
              type="text"
              required
              // name=""
              value={courseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              placeholder=""
              className={`${styles.input} rounded-full`}
              id="demoUrl"
            />
          </div>
         
          </div> 
          <br />
          <div className="w-full flex justify-between">
          <div className="w-[45%]">
         <label className={`${styles.label}`} htmlFor="email">Course Tags</label>
        <input
              type="text"
              required
              name=""
              value={courseInfo.tags}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              placeholder="Software Dev, MERN, Tailwind, CSS, Web, ReactJS, React Native"
              className={`${styles.input} rounded-full`}
              id="tags"
            /> 
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label} w-[50%]`}>Course Category</label>
            <select id="" name="">
              <option value="">Select Category</option>
              {categories.map((category: any)=> (
                <option value={category._id} key={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
         
          </div> 
        
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course level</label>
            <input
              type="text"
              required
              value={courseInfo.level}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              id="level"
              placeholder="beginner/intermediate/expert"
              className={`${styles.input} rounded-full`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label} w-[50%]`}>Demo Url</label>
            <input
              type="text"
              required
              // name=""
              value={courseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              placeholder=""
              className={`${styles.input} rounded-full`}
              id="demoUrl"
            />
          </div>
         
          </div> 
          <br />
          <div className="w-full">
            <input 
                type="file"
                accept="image/*"
                id="file"
                className="hidden"
                onChange={handleFileChange}
            />
            <label
                htmlFor="file"
                className={`w-full min-h-[10vh]  dark:border-white border-[#00000026] p-3 border flex items-center justify-center mb-5 ${dragging ? "bg-blue-500" : "bg-transparent"}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
            {courseInfo.thumbnail ? (
                <img
                    src={courseInfo.thumbnail}
                    width={100}
                    height={100}
                    alt="Course thumbnail"
                    className="max-h-full w-full object-cover"
                />
            ) :(
                <span className="text-black dark:text-white cursor-pointer">
                    Drag and drop yur thumbnail here or click to drop
                </span>
            )}
            </label>
          </div>
            <br />
            <div className="w-full flex items-center justify-end">
                <input
                    value="Next" 
                    type="submit" 
                    className="w-full 800px:w-[100px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                />
                <br />
                <br />
            </div>
      </form>
    </div>
  );
};

export default CourseInformation;
