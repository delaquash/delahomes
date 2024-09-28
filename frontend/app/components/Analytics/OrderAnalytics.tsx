import { styles } from '@/app/styles/style';
import { useGetOrderAnalysisQuery } from '@/redux/features/analytics/analyticsApi';
import React, { useEffect } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';import Loader from '../Loader/Loader';
const data = [
    {
        name: "Page A",
        count: 9000
    },
    {
        name: "Page B",
        count: 8000
    },
    {
        name: "Page C",
        count: 7000
    },
    {
        name: "Page D",
        count: 6000
    },
    {
        name: "Page E",
        count: 5000
    },
    {
        name: "Page F",
        count:  4000
    },
    {
        name: "Page G",
        count: 3000
    },
    {
        name: "Page H",
        count: 2000
    },
]

type Props = {
    isDashboard: true
}

const OrderAnalytics = ({isDashboard}: Props) => {
    const {isLoading} = useGetOrderAnalysisQuery({});

    useEffect(()=>{}, [])

    const analyticsData: any = []

    data && data.forEach((analysis: any)=> {
        analyticsData.push({ name: analysis.month, uv: analysis.count })
    });

  return (
    <>
     {isLoading ? (
        <Loader />
     ) : (
        <div className={isDashboard ? "h-[30vh]" : "h-screen"}>
            <div className={isDashboard ? "mt-[0px] pl-[40px] mb-2": "mt-[50px]"}>
                <h1 className={`${styles.title} ${isDashboard && "!text-[20px]"} px-5 !text-start`}>
                    Order Analytics
                </h1>
                {!isDashboard && (
                    <p className={`${styles.label} px-5`}>
                        Last 12 months Analytics data
                    </p>
                )}
            </div>
        </div>
     )}
    </>
  )
}

export default OrderAnalytics