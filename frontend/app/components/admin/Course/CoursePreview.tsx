import React from 'react'
import CoursePlayer from './CoursePlayer';

type Props = {
    active: number;
    setActive: (active: number) => void;
    courseData: any;
    handleCourseCreate: any
}

const CoursePreview = ({active, courseData, handleCourseCreate, setActive}: Props) => {
  return (
    <div className='w-[90%] m-auto py-5 mb-3'>
        <div className="w-full relative">
            <div className="w-full mt-10">
                <CoursePlayer
                    videourl={courseData?.demoUrl}
                    title= {courseData?.title}
                />
            </div>
        </div>
    </div>
  )
}

export default CoursePreview