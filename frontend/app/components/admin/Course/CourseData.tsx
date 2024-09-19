import { styles } from '@/app/styles/style';
import React from 'react'
import AddCircleIcon from "@mui/icons-material/AddCircle";
import toast from 'react-hot-toast';
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
        const handleBenefit = () => {
            setBenefits([...benefits, {title: ""}])
        }

        const handlePrerequisiteChange = (index: number, value: any) => {
            const updatedPrerequisite= [...prerequisites]
            /* `updatedPrerequisite[index].title = value` is updating the title of a prerequisite at a
            specific index in the `updatedPrerequisite` array with the new value passed as `value`.
            This line of code is used in the `handlePrerequisiteChange` function to update the title
            of a prerequisite based on the user input in the input field. */
            updatedPrerequisite[index].title = value
            /* `setPrerequisites(updatedPrerequisite)` is a function call that updates the state of the
            prerequisites in the parent component with the new array `updatedPrerequisite`. By
            calling `setPrerequisites(updatedPrerequisite)`, you are updating the prerequisites
            state with the modified array that includes the changes made to a specific prerequisite
            at a particular index. This allows the React component to re-render and reflect the
            updated prerequisites data in the UI based on the user input or changes made. */
            setPrerequisites(updatedPrerequisite)
        }
        const handlePrerequisite = () => {
            /* `setPrerequisites([...prerequisites, {title: ""}])` is a function call that updates the
            state of the `prerequisites` array in the parent component by adding a new object with
            an empty `title` property to the existing array. */
            setPrerequisites([...prerequisites, {title: ""}])
        }

        const prevButton = () => {
            setActive(active -1 )
        }

      /**
       * The `handleOptions` function checks if the last elements in the `benefits` and `prerequisites`
       * arrays have titles filled before allowing the user to proceed to the next step, displaying an
       * error message if they are empty.
       */
      const handleOptions = () => {
        // Ensure that benefits and prerequisites are arrays with at least one element
        const lastBenefit = benefits.length > 0 ? benefits[benefits.length - 1] : null;
        const lastPrerequisite = prerequisites.length > 0 ? prerequisites[prerequisites.length - 1] : null;
    
        if (lastBenefit?.title !== "" && lastPrerequisite?.title !== "") {
            setActive(active + 1);
        } else {
            toast.error("Please fill the field before you can proceed");
        }
    };

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
                onClick= {handleBenefit}
            />
        </div>
        <div>
            <label htmlFor="email" className={`${styles.label} text-[20px]`}>
                What are the prerequisites needed to start this course?
            </label>
            <br />
            {prerequisites?.map((prerequisite: any, index: number)=> (
                <input 
                type="text" 
                key={index}
                name='Prerequisite'
                value={prerequisite.title}
                required
                placeholder='Knowledge of fundamentals of software engineering, software development and also basic knowledge of at least one programmming language'
                className={`${styles.input} my-2`}
                onChange={(e)=>handlePrerequisiteChange(index, e.target.value)}
            />
            ))}
               <AddCircleIcon
                style={{ margin: "10px 0px ", cursor: "pointer", width: "30px"}}
                onClick= {handlePrerequisite}
            />
        </div>
        <div className="w-full flex items-center justify-between">
            <div className="w-full 800px:w-[100px] flex items-center 
                h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-4 cursor-pointer"
                onClick={()=> prevButton()}
            >
                Prev
            </div>
            <div className=" w-full 800px:w-[100px] justify-center flex items-center 
                h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-4 cursor-pointer"
                onClick={()=> handleOptions()}
            >
                Next
            </div>
        </div>
    </div>


  )
}

export default CourseData