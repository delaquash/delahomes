
import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material';
import { Box, Button } from '@mui/material';
import { styles } from '../../styles/style';
import { useGetAllCourseQuery } from '@/redux/features/course/coursesApi';
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
        
    </div>
  )
}

export default Courses