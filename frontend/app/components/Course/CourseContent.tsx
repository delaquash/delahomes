"use client"
import React, { useState } from 'react'
import Heading from '@/app/utils/Heading'
// import CourseContentMedia from './CourseContentMedia'
import Header from '../Header'
import CourseContentList from './CourseContentList'
import Loader from '../Loader/Loader'
import { useGetCourseContentQuery } from '@/redux/features/course/coursesApi'
import CourseContentMedia from './CourseContentMedia'

type Props = {
    id: any
}

const CourseContent = ({ id }: Props) => {
     // Get Course Content Query
  const { data: contentData, isLoading, refetch } = useGetCourseContentQuery(id,
    { refetchOnMountOrArgChange: true })

  const data = contentData?.content
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState('Login')

  const [activeVideo, setActiveVideo] = useState(0);

  return (
    <>
    {isLoading ? (
        <Loader/>
    ) : (
       <>
          <Header activeItem={1} open={open} setOpen={setOpen} route={route} setRoute={setRoute} />
           <div  className="w-full grid 800px:grid-cols-10">
            <Heading 
             title={`${data[activeVideo]?.title} - Sapphire`}
             description="Saphire Sync is a platform for students to learn and get help from teachers"
             keywords={data[activeVideo]?.tags}/>
             <div className='col-span-7'>
               <CourseContentMedia data={data} id={id} activeVideo={activeVideo} setActiveVideo={setActiveVideo} user={data.user} refetch={refetch}/>
             </div>
             <div className="hidden 800px:block 800px:col-span-3">
              <CourseContentList setActiveVideo={setActiveVideo} data={data} activeVideo={activeVideo}/>
             </div>
            </div>
       </>
    )}
    </>
  )
}

export default CourseContent


