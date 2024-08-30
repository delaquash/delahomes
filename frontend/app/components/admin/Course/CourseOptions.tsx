import React from 'react';

type Props = {
    active: number;
    setActive: (active: number) => void;
}

const CourseOptions = ({ active, setActive}: Props) => {
    const options = [
        "Course Information",
        "Course Options",
        "Course Content",
        "Course Preview"
    ]
  return (
    <div>
        {options.map((options: any, index: number)=> (
            <div key={index} className={`w-full flex py-5`}>
                <div className={`w-[35px] h-[35px] rounded-full flex items-center justify-center ${active + 1 > index ? "bg-blue-500" : "bg-[#384766]"} relative`}>

                </div>
            </div>
        ))}
    </div>
  )
}

export default CourseOptions