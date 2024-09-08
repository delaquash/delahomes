import React, { useState } from 'react'

type Props = {
    active: number;
    setActive: (index: number) => void;
    courseContentData: any;
    setCourseContentData: (courseContentData: any) => void;
    handleSubmit: any
}

const CourseContent = ({ courseContentData, setCourseContentData, active, setActive, handleSubmit:handleCourseSubmit}: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(Array(courseContentData.length).fill(false));

  const [activeSection, setActiveSection] = useState(1)

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }
  return (
    <div >

    </div>
  )
}

export default CourseContent