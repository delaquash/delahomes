import { styles } from '@/app/styles/style';
import { useGetUserAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import Loader from '../Loader/Loader';

type Props = {
    isDashboard?: boolean
}

const UserAnalytics = ({isDashboard}: Props) => {
    const {data, isLoading } = useGetUserAnalyticsQuery({})

        const analyticsData = [
        {name: "Jan 2023", count: 2001},
        {name: "Feb 2023", count: 4001},
        {name: "March 2023", count: 6001},
        {name: "April 2023", count: 8001},
        {name: "May 2023", count: 1001},
        {name: "Jun 2023", count: 5001},
        {name: "July 2023", count: 7001},
        {name: "Aug 2023", count: 7001},
        {name: "Sept 2023", count: 7001},
        {name: "Oct 2023", count: 7001},
        {name: "Nov 2023", count: 7001},
        {name: "December 2023", count: 7001},
    ]

    // This is the actual data from api, the one above is just hardcoded
    // const analyticsData: any = []

    // data && data.courses.last12Months.forEach((analysis: any)=> {
    //     analyticsData.push({ name: analysis.name, uv: analysis.count })
    // });
    
  return (
    <>
        {isLoading ? (
            <Loader />
        ) : (
            <div className={`${!isDashboard ? "mt-[50px]" :"mt-[50px] dark:bg-[#111C43] shadow-sm pb-5 rounded-sm"}`}>
                <div className={`${isDashboard ? "!ml-8 mb-5": ""}`}>
                    <h1 className={`${styles.title} ${isDashboard && "!text-[20px]"} px-5 !text-start`}> User Analytics</h1>
                    {!isDashboard && (
                        <p className={`${styles.label} px-5`}>Last 12 months analytics data {" "}</p>
                    )}
                </div>
                    <div className={`w-full ${isDashboard ? "h-[30vh]" : "h-screen"} flex items-center justify-center`}>
                        <ResponsiveContainer
                            width={isDashboard ? "100%" : "90%"} height={!isDashboard ? "50%" : "100%"}
                        >
                            <AreaChart
                                data={analyticsData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 0,
                                    bottom: 0
                                }}
                            >
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Area 
                                    type="monotone"
                                    dataKey="count"
                                    stroke='#4d62d9'
                                    fill='4d62d9'
                                />
                            </AreaChart>
                        </ResponsiveContainer>

                    </div>
            </div>
        )}
    </>
  )
}

export default UserAnalytics