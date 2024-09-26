import { useEditHeroDataMutation, useGetHeroDataQuery } from '@/redux/features/layout/layout'
import React, { useState } from 'react'
import Loader from '../Loader/Loader'
import { styles } from '@/app/styles/style'

type Props = {}

const Categories = (props: Props) => {
    const { data, isLoading, refetch } = useGetHeroDataQuery("FAQ", {
        refetchOnMountOrArgChange: true
    })
    const [editHeroData,{ isSuccess:LayoutSuccess, error }] =useEditHeroDataMutation()
    const [ categories, setCategories ] = useState()
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.title}>

        </div>
      )}
    </>
  )
}

export default Categories