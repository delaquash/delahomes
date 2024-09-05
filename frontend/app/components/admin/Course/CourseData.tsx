import { styles } from '@/app/styles/style';
import React from 'react'
import AddCircleIcon from "@mui/icons-material/AddCircle";
type Props = {
    benefits:{title: string}[];
    setBenefits:(benefits:{title: string}[]) => void;
    prerequisites:{title: string}[];
    setPrerequisites:(prerequisite:{title: string}[]) => void;
    active: number;
    setActive: (active: number) => void;
}

const CourseData = ({
        benefits, 
        setBenefits, 
        prerequisites, 
        setPrerequisites, 
        active, 
        setActive
    }: Props) => {
        const handleBenefitChange= (index: number, value: any) => {
            const updatedBenefits = [...benefits];
            updatedBenefits[index].title = value;
            setBenefits(updatedBenefits)
        }
        const handleAddPrerequisite = () => {
            setBenefits([...benefits, {title: ""}])
        }
  return (
    <div className='w-[80%] m-auto mt-24 block'>
        <div>
            <label htmlFor="email" className={`${styles.label} text-[20px]`}>
                What do students stand to gain from this course?
            </label>
            <br />
            {benefits.map((benefit:any, index: number)=> (
                <input 
                    type="text" 
                    key={index}
                    name='Benefit'
                    value={benefit.title}
                    required
                    placeholder='You ill be able to learn about the fundamentals of Software Engineering and build web applications.'
                    className={`${styles.input} my-2`}
                    onChange={(e)=>handleBenefitChange(index, e.target.value)}
                />
            ))}
            <AddCircleIcon
                style={{ margin: "10px 0px ", cursor: "pointer", width: "30px"}}
                onClick= {handleAddPrerequisite}
            />
        </div>
        <div>
            <label htmlFor="email" className={`${styles.label} text-[20px]`}>
                What are the prerequisites needed to start this course?
            </label>
            <br />
            {prerequisites.map((prerequisite: any, index: number)=> (
                <input 
                type="text" 
                key={index}
                name='Prerequisite'
                value={prerequisite.title}
                required
                placeholder='Knowledge of fundamentals of software engineering, software development and also basic knowledge of at least one programmming language'
                className={`${styles.input} my-2`}
                onChange={(e)=>handleBenefitChange(index, e.target.value)}
            />
            ))}
        </div>
    </div>


  )
}

export default CourseData