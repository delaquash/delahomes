import React from 'react'

type Props = {
    active: number;
    setActive: (index: number) => void;
    courseContentData: any;
    setCourseContentData: (courseContentData: any) => void;
    handleSubmit: any
}

const CourseContent = (props: Props) => {
  return (
    <div>CourseContent</div>
  )
}

export default CourseContent