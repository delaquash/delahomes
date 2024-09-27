"use client"
import React, { useEffect, useState } from 'react'
import CourseInformation from './CourseInformation'
import CourseOptions from './CourseOptions'
import CourseData from './CourseData'
import CourseContent from './CourseContent'
import CoursePreview from './CoursePreview'
import { useCreateCourseMutation } from '@/redux/features/course/coursesApi'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'
import { CourseContentDataProps, CourseInfo } from '@/types/createCourse'

type Props = {}

export interface Benefit {
    title: string;
}

interface Prerequisite {
    title: string;
}[]

const CreateCourse = (props: Props) => {
    const [active, setActive] = useState<number>(0)
    const [courseInfo, setCourseInfo] = useState<CourseInfo>({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        tags: "",
        categories: "",
        level: "",
        demoUrl: "",
        thumbnail:""
    });
    const [benefits, setBenefits] = useState<Benefit[]>([{ title: "" }]);
    const [prerequisites, setPrerequisites] = useState<Prerequisite[]>([{ title: ""}]);
    const [courseContentData, setCourseContentData] = useState<CourseContentDataProps[]>([
        {
            videoUrl: "",
            title: "",
            videoLength: "",
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
    const [createCourse, {isSuccess, error, isLoading}] = useCreateCourseMutation()

    useEffect(() => {
        if (isSuccess) {
            toast.success("Courses created successfully...")
            redirect("/admin/courses")
            }
            if(error){
                if("data" in error){
                    const errorMessage = error as any  
                    toast.error(errorMessage.data.message)     
                }          
            }
    }, [isLoading, isSuccess, error])

    const handleSubmit= async() => {
        const formattedBenefit = benefits.map((benefit)=>({ title: benefit.title }))
        const formattedPrerequisite = prerequisites.map((prerequisite)=>({title: prerequisite.title}))

        // format course content array
        const formattedCourseContentData = courseContentData.map((courseContent)=> ({
            videoUrl: courseContent.videoUrl,
            title: courseContent.title,
            description: courseContent.description,
            videoLength: courseContent.videoLength,
            videoSection: courseContent.videoSection,
            links: courseContent.links.map((link)=>({
                title: link.title, 
                url: link.url
                })),
            suggestion: courseContent.suggestion

        }))
        const data = {
            name: courseInfo.name,
            description: courseInfo.description,
            price : courseInfo.price,
            estimatedPrice: courseInfo.estimatedPrice,
            tags: courseInfo.tags,
            level: courseInfo.level,
            demoUrl: courseInfo.demoUrl,
            thumbnail: courseInfo.thumbnail,
            totalVideos: courseContentData.length,
            benefits: formattedBenefit,
            prerequisites: formattedPrerequisite,
            courseContentData: formattedCourseContentData
        }
        setCourseData(data)
    }

    const handleCourseCreate =async (e: any) => {
        const data = courseData;
        if(!isLoading){
            await createCourse(data)
        }
    }
    
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

            {active === 1 && (
                <CourseData
                    benefits={benefits}
                    setBenefits={setBenefits}
                    /* The expression `prerequisites={prerequisites || [{ title:"" }]}` in the
                    `CourseData` component is setting the `prerequisites` prop with the value of the
                    `prerequisites` state if it is truthy. If `prerequisites` is falsy (e.g., `null`
                    or `undefined`), it will default to an array containing a single object with a
                    `title` property set to an empty string (`[{ title: "" }]`). Meaning, I forced it to be an array with a default value*/
                    prerequisites={prerequisites || [{ title:"" }]} 
                    setPrerequisites={setPrerequisites}
                    active={active}
                    setActive={setActive}
                />
            )}
            {active === 2 && (
                <CourseContent
                    active={active}
                    setActive={setActive}
                    courseContentData={courseContentData}
                    setCourseContentData={setCourseContentData}
                    handleSubmit={handleSubmit}
                />
            )}
            {active === 3 && (
                <CoursePreview              
                    active={active}
                    setActive={setActive}
                    courseData={courseData}
                    handleCourseCreate = {handleCourseCreate}
                
                />
            )}
        </div>
        <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
            <CourseOptions 
                active={active} 
                setActive={setActive} 
            />
        </div>
    </div>
  )
}

export default CreateCourse;