"use client"
import React, { useEffect, useState } from 'react'
import CourseInformation from './CourseInformation'
import CourseOptions from './CourseOptions'
import CourseData from './CourseData'
import CourseContent from './CourseContent'
import CoursePreview from './CoursePreview'
import { useEditCourseMutation, useGetCoursesQuery } from '@/redux/features/course/coursesApi'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'
import { CourseContentDataProps, CourseInfo } from '@/types/createCourse'

type Props = {
    id: string
}

interface Course {
    benefits: { title: string; description: string }[];  // Assuming benefits are objects with title and description
    courseData: { sectionTitle: string; content: string }[]; // Assuming courseData are objects
    demoUrl: string;
    description: any;
    estimatedPrice: number;
    level: string;
    name: string;
    prerequisites: { title: string }[]; // Assuming prerequisites are objects with title
    price: number;
    purchased: number;
    ratings: number;
    reviews: { author: string; comment: string }[]; // Assuming reviews are objects with author and comment
    tags?: string;
    _id: string;
    __v: number;
  }

  interface DataProps {
    success: boolean;
    course: Course[];
  }

const EditCourse = ({ id }: Props) => {
    const [editCourse,{ isSuccess, error }] = useEditCourseMutation();
    const { isLoading, data, refetch } = useGetCoursesQuery({}, {refetchOnMountOrArgChange: true})
    
    const editCourseData = data && data.courses.find((editCourse: Course)=>editCourse._id === id )

    useEffect(()=> {
        if(isSuccess){
            const message = "Course updated successfully."
            toast.success(message);     
            redirect('/admin/all-courses')
        }
        if(error) {
            if("data" in error){
                const errorMessage = error as any;
                const message = errorMessage.data.message;
                toast.error(message)
            }
        }
    })
  

    useEffect(()=>{
        if(editCourseData) {
            setCourseInfo({
                name: editCourseData.name,
                description: editCourseData.description,
                price: editCourseData.price,
                estimatedPrice: editCourseData.estimatedPrice,
                level: editCourseData.level,
                tags: editCourseData.tags,
                demoUrl: editCourseData.demoUrl,
                thumbnail: editCourseData.thumbnail,
            }),
            setBenefits( editCourseData.benefits)
            setPrerequisites( editCourseData.setPrerequisites)
            setCourseContentData( editCourseData.purchased)
        }
    }, [])
    const [active, setActive] = useState(0)
    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        tags: "",
        level: "",
        demoUrl: "",
        thumbnail:""
    });

    
    const [benefits, setBenefits] = useState([{ title: ""}]);
    const [prerequisites, setPrerequisites] = useState([{title: ""}]);
    const [courseContentData, setCourseContentData] = useState<CourseContentDataProps[]>([
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
    const handleSubmit= async() => {
        const formattedBenefit = benefits.map((benefit)=>({ title: benefit.title }))
        const formattedPrerequisite = prerequisites?.map((prerequisite)=>({title: prerequisite.title}))

        // format course content array
        const formattedCourseContentData = courseContentData.map((courseContent)=> ({
            videoUrl: courseContent.videoUrl,
            title: courseContent.title,
            description: courseContent.description,
            videoSection: courseContent.videoSection,
            links: courseContent.links.map((link: any)=>({
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
            courseData: formattedCourseContentData
            
    
        }
    }

    const handleCourseCreate =async (e: any) => {
        const data = courseData;
        await editCourse({ id: editCourseData?._id, data })
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
                    prerequisites={prerequisites}
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
                    isEdit={true} 
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

export default EditCourse;