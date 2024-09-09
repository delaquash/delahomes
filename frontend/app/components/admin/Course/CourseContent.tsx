import { styles } from '@/app/styles/style';
import React, { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { BsPencil } from 'react-icons/bs';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

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
  
  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData)
  }

  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed)
  }
  return (
    <div className='w-[80%] m-auto mt-24 p-3'>
        <form onSubmit={handleSubmit}>
    
          {courseContentData.map((item: any, index: number)=> {
         /* The line `const showSectionInput = index === 0 || item.videosSection !==
         courseContentData[index - 1].videoSection;` is determining whether to show a section input
         based on the current item's `videosSection` value compared to the previous item's
         `videoSection` value in the `courseContentData` array. */
            const showSectionInput = index === 0 || item.videosSection !== courseContentData[index - 1].videoSection;
            return (
              <>
                <div className={`w-full bg-[#cdc8c817] p-4 ${showSectionInput ? "mt-10" : "mb-0"}`}>
                  <>
                    {showSectionInput && (
                      <>
                      <div>
                        <input 
                          type='text'
                          className={`text-[20px] ${item.videoSection === "Untitled Section" ? "w-[170px]" : "w-min"} font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                          value={item.identification}
                          onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].videoSection = e.target.value;
                            setCourseContentData(updatedData)
                          }}
                        />
                        <BsPencil className='cursor-pointer dark:text-white text-black'/>
                      </div>
                      <br />
                      </>
                    )}
                  </>
                  <div className="flex w-full items-center justify-between my-0">
                    {isCollapsed[index] ? (
                      <>
                      {item.title ? (
                        <p className='font-Poppins dark:text-white text-black'>
                          {index + 1} .{item.title}
                        </p>
                      ): (
                        <>
                        
                        </>
                      )}
                    </>
                    ) : (
                      <div></div>
                    )}
                    {/* arrowbutton for collapsed video content */}
                    <div className="flex items-center">
                      <AiOutlineDelete 
                          className={`dark:text-wrap text-[25px] mr-2 text-black ${index > 0 ? "cursor-pointer": "cursor-no-drop"}`}
                     
                          onClick={()=> {
                            if(index > 0) {
                              const updatedData = [...courseContentData];
                              updatedData.splice(index, 1);
                              setCourseContentData(updatedData)
                            }
                          }} 
                      />
                      <MdOutlineKeyboardArrowDown 
                        fontSize="large"
                        className='dark:text-white text-black'
                        style={{
                          transform: isCollapsed[index] ? "rotate[180deg] ":"rotate[0deg]"
                        }}
                        onClick={()=> handleCollapseToggle(index)}
                      />
                    </div>
                  </div>
                  {!isCollapsed[index] && (
                    <>
                      <div className='my-3'>
                          <label className={styles.label}>Video Title</label>
                          <input 
                            type='text'
                            value={item.title}
                            placeholder='Project Plan'
                            className={`${styles.title}`}
                            onChange={(e)=> {
                              const updatedData = [...courseContentData];
                              updatedData[index].title = e.target.value;
                              setCourseContentData(updatedData)
                            }}
                          />
                      </div>
                      <div className='mb-3'>
                          <label className={styles.label}>Video Url</label>
                          <input 
                            type='text'
                            value={item.videoUrl}
                            placeholder='...'
                            className={`${styles.title}`}
                            onChange={(e)=> {
                              const updatedData = [...courseContentData];
                              updatedData[index].videoUrl = e.target.value;
                              setCourseContentData(updatedData)
                            }}
                          />
                      </div>
                      <div className='mb-3'>
                          <label className={styles.label}>Video Description</label>
                          <textarea
                            rows={8}
                            cols={30}
                            value={item.description}
                            placeholder='Project Plan'
                            className={`${styles.input} !h-min py-2`}
                            onChange={(e)=> {
                              const updatedData = [...courseContentData];
                              updatedData[index].description = e.target.value;
                              setCourseContentData(updatedData)
                            }}
                          />
                          <br />
                          <br />
                          <br />
                      </div>
                      {item?.links.map((link: any, linkIndex: number)=> (
                        <div className="mb-3 block">
                          <div className="w-full flex items-center justify-center">
                            <label className={styles.label}>
                              Link {linkIndex + 1}
                            </label>
                            <AiOutlineDelete 
                              className=''
                              onClick={()=> linkIndex === 0 ? null : handleRemoveLink(index, linkIndex)}
                            />
                          </div>
                          <input 
                            type='text'
                            value={link.title}
                            placeholder='Source Code ... {Link title}'
                          
                          />
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </>
            )
          })}
        </form>
    </div>
  )
}

export default CourseContent