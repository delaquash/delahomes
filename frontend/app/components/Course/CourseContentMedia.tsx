import React, { useState } from 'react'
import CoursePlayer from '../admin/Course/CoursePlayer';
import { styles } from '@/app/styles/style';
import Image from "next/image";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

type Props = {
    data:any
    activeVideo: number;
    setActiveVideo: (activeVideo: number) => void;
    user: any; 
    refetch: any;
    id: any;
}

const CourseContentMedia = ({data, activeVideo, setActiveVideo, user, refetch}: Props) => {
    const [activeBar, setactiveBar] = useState(0);
    const [question, setQuestion] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(1);
    const [answer, setAnswer] = useState("");
    const [questionId, setQuestionId] = useState("");
    const [reply, setReply] = useState("");
    const [reviewId, setReviewId] = useState("");
    const [isReviewReply, setIsReviewReply] = useState(false);
  return (
    <div className='w-[95%] 800px:w-[96%] py-4 m-auto'>
        <CoursePlayer 
            title={data[activeVideo]?.title}
            videoUrl={data[activeVideo]?.videoUrl}
        />
        <div className="w-full flex items-center justify-between my-3">
            <div className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset] ${activeVideo === 0 && "!cursor-no-drop opacity-[.8]"}`}
                onClick={()=> activeVideo === 0 ? 0 : activeVideo -1}
            >
                <AiOutlineArrowLeft className="mr-2" />
                Prev Lesson
            </div>
            <div
          className={`${styles.button} !w-[unset] text-white  !min-h-[40px] !py-[unset] ${data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"}`}
          onClick={() => setActiveVideo(data && data.length - 1 === activeVideo ? activeVideo : activeVideo + 1)}>
          Next Lesson
          <AiOutlineArrowRight className="ml-2" />
        </div>
        </div>

        <h1 className="pt-2 text-[25px] font-[600] dark:text-white text-black ">
        {data[activeVideo].title}
       </h1>
        <br />
        <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5 key={index} className={`800px:text-[20px] cursor-pointer ${activeBar === index ? "text-red-500" : "dark:text-white text-black"}`}
            onClick={() => setactiveBar(index)}>
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3 dark:text-white text-black">
          {data[activeVideo]?.description}
        </p>
      )}
      
      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div className="mb-5" key={index}>
              <h2 className="800px:text-[20px] 800px:inline-block dark:text-white text-black">
                {item.title && item.title + " :"}
              </h2>
              <a
                className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2"
                href={item.url}
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}

    {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image src={user.avatar ? user.avatar.url : "/profile.jpg"} width={50} height={50} alt="" className="w-[50px] h-[50px] rounded-full object-cover"/>
            <textarea name="" value={question} onChange={(e) => setQuestion(e.target.value)} id="" cols={40} rows={5} placeholder="Write your question..."
             className="outline-none bg-transparent ml-3 border dark:text-white text-black border-[#0000001d] dark:border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <div className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 

            `}
              // onClick={questionCreationLoading ? () => {} : handleQuestion}
              >
              Submit
              
            </div>
          </div>
        </>
    )}
    </div>
  )
}

export default CourseContentMedia

// ${questionCreationLoading && "cursor-not-allowed"} 