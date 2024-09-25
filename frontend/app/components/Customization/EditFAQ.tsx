import { styles } from '@/app/styles/style'
import { useGetHeroDataQuery } from '@/redux/features/layout/layout'
import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { HiMinus, HiPlus } from 'react-icons/hi'
import { IoMdAddCircleOutline } from 'react-icons/io'

type Props = {}

const EditFAQ = (props: Props) => {
    const { data, isLoading, refetch } = useGetHeroDataQuery("FAQ", {
        refetchOnMountOrArgChange: true
    })
    const [questions, setQuestions] = useState<string[]>([]);

    useEffect(()=> {
        if(data){
            setQuestions(data.layout.faq)
        }
    })
 
    const handleQuestionChange = (id: any, value: string) => {
        setQuestions((prevQuestions)=> 
            prevQuestions.map((prevQuestion: any)=>(
                prevQuestion._id === id ? {...prevQuestion, question:value } : prevQuestion
            ))
        )
    }

    const toggleQuestion =(id: any)=> {
     setQuestions((prevQuestion)=> 
            prevQuestion.map((prev: any)=> (prev._id === id ? {...prev, active: !prev.active}: prev))
        )
    }

    const handleAnswerChange = (id: any, value: string) => {
        setQuestions((prevQuestions)=> 
            prevQuestions.map((prev: any)=> (prev._id === id ? { ...prev, answer: value} : prev))
        )
    }

    const newFaqHandler = () => {
        setQuestions([
            ...questions, 
            {
                questions: "",
                answer: ""
            },
        ]);
    };

    
  return (
    <div className="w-[90%} 800px:w-[80%] m-auto mt-[120px]">
        <div className="mt-12">
            <dl className='space-y-8'>
                {questions.map((question: any)=> (
                    <div key={question._id}
                        className={`${question._id !== question[0]?._id && "border-t"} border-gray-200 pt-6`}
                    >
                        <dt className="text-lg">
                            <button
                                className='flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none'
                                onClick={()=>toggleQuestion(question._id)}
                            >
                                <input 
                                    className={`${styles.input} border-none`}
                                    value={question.question}
                                    onChange={(e)=> handleQuestionChange(question._id, e.target.value)}
                                    placeholder={"Add your question..."}
                                />

                                <span className='ml-5 flex-shrink-6'>
                                    {question.active ? (
                                        <HiMinus className='h-6 w-6' />) : (
                                            <HiPlus className='h-6 w-6' />
                                        )}
                                </span>
                            </button>
                        </dt>
                        {question.active && (
                            <dd className="mt-2 pr-12">
                                <input 
                                    className={`${styles.input} border-none`}
                                    value={question.answer}
                                    onChange={(e)=> handleAnswerChange(question._id, e.target.value)}
                                    placeholder={"Add your answer..."}
                                />
                                <span className="ml-6 flex-shrink-0">
                                    <AiOutlineDelete 
                                        className='dark:text-white text-black text-[18px] cursor-pointer'
                                        onClick={()=> {
                                               setQuestions((prevQuestion)=> (
                                                prevQuestion.filter((item: any)=>item._id !== question._id)
                                            ))
                                        }}
                                    />
                                </span>
                            </dd>
                        )}
                    </div>
                ))}
            </dl>
            <br />
            <br />
            <IoMdAddCircleOutline 
                className='dark:text-white text-black text-[25px] cursor-pointer'
                onClick={newFaqHandler}
            />
        </div>
        <div className={`${styles.button} !w-[100px] !min-h-[40px] dark:text-white text-black bg-[#ccccc34] ${
            areQuestionsUnchanged(data.layout.faq, questions) || isAnyQuestionEmpty(questions) ? "!cursor-not-allowed" : "!cursor-pointer !bg-[#42d383]"
            } !rounded absolute bottom-12 right-12`}
            onClick={
                areQuestionsUnchanged(data.layout.faq, questions) || isAnyQuestionEmpty(questions) ? () => null : handleEdit
            }
            >
                Save
        </div>
    </div>
  )
}

export default EditFAQ