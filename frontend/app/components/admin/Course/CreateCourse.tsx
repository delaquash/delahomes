"use client"
import React, { useState } from 'react'
import CourseInformation from './CourseInformation'
import CourseOptions from './CourseOptions'

type Props = {}

const CreateCourse = (props: Props) => {
    const [active, setActive] = useState(0)
    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        price: "",
        tags: "",
        level: "",
        demoUrl: "",
        thumbnail:""
    });
    const [benefits, setBenefits] = useState({ title: ""});
    const [prerequisite, setPrerequisite] = useState({title: ""});
    const [courseContentData, setCourseContentData] = useState([
        {
            videoUrl: "",
            title: "",
            description: "",
            videoSection: "Untitled Section",
            links: [
                {
                    title: "",
                    url: ""
                }
            ],
            suggestion: ""
        }
    ])
    const [courseData, setCourseData] = useState({});
  return (
    <div className='w-full flex min-h-screen'>
        <div className="w-[80%]">
            {active === 0 && (
                <CourseInformation 
                    courseInfo={courseInfo}
                    setCourseInfo={setCourseInfo}
                    active={active}
                    setActive={setActive}
                />
            )}
        </div>
        <div className="w-[20px] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
            <CourseOptions active={active} setActive={setActive} />
        </div>
    </div>
  )
}

export default CreateCourse