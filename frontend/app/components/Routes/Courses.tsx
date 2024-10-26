
import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material';
import { Box, Button } from '@mui/material';
import { styles } from '../../styles/style';
import { useGetAllCourseQuery } from '@/redux/features/course/coursesApi';
import CourseCard from '../Course/CourseCard';
// import { toast } from 'react-toastify';

type Props = {}

const Courses = (props: Props) => {
    const { data, isLoading } = useGetAllCourseQuery({})
    const [courses, setCourses ] = useState<any[]>([])

    useEffect(()=> {
        setCourses(data?.courses);
    }, [data]);


  return (
    <div>
        <div className={`w-[90%] 800px:w-[80%] m-auto`}> 
            <h1 className='text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight'>
                Expand Your Career {" "}
                <span className='text-gradient'>Opportunity</span> <br />
                With Our Courses
            </h1>
            <br />
            <br />
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols04 1500px:gap-[35px] mb-12 border-0">
                {courses && courses.map((course: any, index: number)=> (
                    <CourseCard 
                        course={course}
                        key={index}
                    />
                ))}
            </div>
        </div>
    </div>
  )
}

export default Courses