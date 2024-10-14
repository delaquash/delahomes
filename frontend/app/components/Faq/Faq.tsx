import { styles } from '@/app/styles/style';
import { useGetHeroDataQuery } from '@/redux/features/layout/layout';
import React, { useEffect, useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';

type Props = {}

const Faq = (props: Props) => {
    const { data, isLoading } = useGetHeroDataQuery("FAQ")
    const [activateQuestion, setActivateQuestion] = useState(null);
    const [questions, setQuestions] = useState<any[]>([])

    useEffect(() => {
        if (data?.layout?.faq) {
          setQuestions(data.layout.faq);
        }
      }, [data]);

    const toggleQuestion = (id: any) => {
        setActivateQuestion( activateQuestion === id ? null : id)
    }
  return (
   <div className="w-[90%] 800px:w-[80%] m-auto">
        <h1 className={`${styles.title} 800px:text-[40px]`}>
            Frequently Asked Questions
        </h1>
        <div className="mt-12">
            <dl className="space-y-8">
                {questions.map((question) => (
                    <div key={question.id} className={`${question.id !== question[0]?._id && "border-t"} borrder-gray-200 pt-6`}>
                        <dt className="text-lg">
                            <button className='flex items-start justify-between w-full text-left focus:outline-none'
                                onClick={()=>toggleQuestion(question._id)}
                            >
                                <span className='font-medium text-black dark:text-white'>
                                    {question.question}
                                </span>
                                <span className="ml-6 flex-shrink-0">
                                    {activateQuestion === question._id ? (
                                        <HiMinus className="h-6 w-6 text-black dark:text-white" />
                                    ) : (
                                       <HiPlus className="h-6 w-6 text-black dark:text-white" />
                                    )}
                                </span>
                            </button>
                        </dt>
                        {activateQuestion === question._id && (
                            <dd className="mt-2 pr-12">
                                <p className="text-base font-Poppins text-black dark:text-white">
                                    {question.answer}
                                </p>
                            </dd>
                        )}
                    </div>
                ))}
            </dl>
        </div>
   </div>
  )
}

export default Faq