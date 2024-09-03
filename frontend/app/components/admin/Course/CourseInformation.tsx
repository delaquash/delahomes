"use client";
import { styles } from '@/app/styles/style';
import React, { useState } from 'react'

type Props = {
    courseInfo:any;
    setCourseInfo: (course: any)=> void;
    active: number;
    setActive: (active: number)=> void;
}

const CourseInformation =({ courseInfo, setCourseInfo, active, setActive}: Props) => {
    const [dragging, setDragging] = useState(false)

    const handleSubmit= (e: any) => {
        e.preventDefault();
        setActive(active+1)
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
            onChange={(e:any)=>setCourseInfo({...courseInfo, description:e.target.value})}
          ></textarea>
        </div>
        <br />
        <div className="w-full flex justify-between">
            <div className="w-[45%]">
                <label className={`${styles.label}`}>Course price</label>
                <input 
                    type='number'
                    required
                    value={courseInfo.price}
                    onChange={(e: any) =>
                    setCourseInfo({ ...courseInfo, price: e.target.value })
                    }
                    id="price"
                    placeholder='30'
                    className={`${styles.input}`}
                />
            </div>
        </div>
      </form>
    </div>
  );
}

export default CourseInformation