import { styles } from '@/app/styles/style';
import { useGetOrderAnalysisQuery } from '@/redux/features/analytics/analyticsApi';
import React, { useEffect } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';import Loader from '../Loader/Loader';

// mock data
const analyticsData = [
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
    const {data , isLoading} = useGetOrderAnalysisQuery({});
    
    console.log(data)

    // const analyticsData: any = []

    // data && data.last12Months.forEach((analysis: any)=> {
    //     analyticsData.push({ name: analysis.month, count: analysis.count })
    // });

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
            <div className={`w-full ${!isDashboard ? "h-[90%]" : "h-full"} flex items-center justify-center`}>
                <ResponsiveContainer
                    width={isDashboard ? "100px": "90px"}
                    height={isDashboard ? "100px": "50px"}
                >
                    <LineChart
                        width={500}
                        height={300}
                        data={analyticsData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        {!isDashboard && <Legend />}
                        <Line type="monotone" dataKey="count" stroke='#82ca9d' />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
     )}
    </>
  )
}

export default OrderAnalytics