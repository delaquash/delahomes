"use client";
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
    <div>

    </div>
  )
}

export default CourseInformation