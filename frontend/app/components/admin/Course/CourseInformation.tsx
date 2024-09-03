"use client";
import { styles } from "@/app/styles/style";
import React, { useState } from "react";

type Props = {
  courseInfo: any;
  setCourseInfo: (course: any) => void;
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };
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
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="mb-5">
          <label className={`${styles.label}`}>Course Registration</label>
          <textarea
            placeholder="Write something amazing..."
            name=""
            rows={10}
            cols={30}
            value={courseInfo.description}
            className={`${styles.label} !h-min !py-2`}
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
              className={`${styles.input}`}
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
              className={`${styles.input}`}
              id="price"
            />
          </div>
        </div>
        <div>
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
              className={`${styles.input}`}
              id="tags"
            />
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
