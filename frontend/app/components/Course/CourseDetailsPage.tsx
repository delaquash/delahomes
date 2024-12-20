"use client";
import { useGetSingleCourseDetailsQuery } from '@/redux/features/course/coursesApi';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import Header from '../Header';
import Footer from '../Footer';
import CourseDetails from './CourseDetails';
import {loadStripe }from "@stripe/stripe-js"
import { useCreatePaymentIntentMutation, useGetStripePublishablekeyQuery } from '@/redux/features/payment/paymentApi';

type Props = {
    id: string
}

const CourseDetailsPage = ({id}: Props) => {
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const { data, isLoading, error } = useGetSingleCourseDetailsQuery(id);
    const { data:config } = useGetStripePublishablekeyQuery({})
    const [createPaymentIntent, {data: paymentIntentData }] = useCreatePaymentIntentMutation();
    const [stripePromise, setStripePromise] = useState<null>(null)
    const [clientSecret, setClientSecret] = useState("")

    useEffect(()=> {
        if(config) {
            const publishableKey = config?.publishableKey;
            createPaymentIntent(loadStripe(publishableKey))
        }
        if(data){
            const amount = Math.round(data.course.price * 100)
            createPaymentIntent(amount)
        }
    }, [config, data])

    useEffect(()=> {
        if(paymentIntentData){
            setClientSecret(paymentIntentData.client_secret)
        }
    },[paymentIntentData])
  return (
    <>
    {
        isLoading ? (
            <Loader />
        ) : (
            <div>
                <Heading
                    title={data.course.name + " - Sapphire"}
                    description={"Saphire Sync is a platform for students to learn and get help from teachers"}
                    keywords={data?.course?.tags}/>
                <Header 
                    route={route} 
                    setRoute={setRoute} 
                    open={open} 
                    setOpen={setOpen} 
                    activeItem={1}
                />
                {stripePromise && (
                    <CourseDetails 
                        data={data.course} 
                        stripePromise={stripePromise} 
                        clientSecret={clientSecret} 
                        setRoute={setRoute} 
                        setOpen={setOpen}
                    />
                )}
                <Footer/>
          </div>
        )
    }
    </>
  )
}

export default CourseDetailsPage

