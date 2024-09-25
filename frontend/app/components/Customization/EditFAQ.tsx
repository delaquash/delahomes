import { useGetHeroDataQuery } from '@/redux/features/layout/layout'
import React, { useEffect, useState } from 'react'

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
  return (
    <div>EditFAQ</div>
  )
}

export default EditFAQ