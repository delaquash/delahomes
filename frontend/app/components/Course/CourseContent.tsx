"use client"
import React, { useState } from 'react'
import Heading from '@/app/utils/Heading'
// import CourseContentMedia from './CourseContentMedia'
import Header from '../Header'
import CourseContentList from './CourseContentList'
import Loader from '../Loader/Loader'
import { useGetCourseContentQuery } from '@/redux/features/course/coursesApi'

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
    <div>CourseContent</div>
  )
}

export default CourseContent


