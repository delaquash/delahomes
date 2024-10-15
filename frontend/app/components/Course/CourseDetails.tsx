import { RootState } from '@reduxjs/toolkit/query'
import React from 'react'
import { useSelector } from 'react-redux'

type Props = {
    data: any
    clientSecret?: string
    stripePromise?: any
    setRoute?: any
    setOpen?: any;
}

const CourseDetails = ({data, clientSecret, stripePromise, setRoute, setOpen: openAuthModal}: Props) => {
    const { user } = useSelector((state: RootState)=> state.auth)
      // Course Discount Percentage
  const dicountPercentenge = ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;

  const discountPercentengePrice = dicountPercentenge.toFixed(0);

  const isPurchased = user && user?.courses?.find((item: any) => item._id === data._id);
  return (
    <div>CourseDetails</div>
  )
}

export default CourseDetails