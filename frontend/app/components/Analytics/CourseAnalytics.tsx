import { useGetCourseAnalyticsQuery } from '@/redux/features/analytics/analyticsApi'
import React from 'react'
import {
    Bar,
    BarChart,
    Label,
    LabelList,
    ResponsiveContainer,
    XAxis,
    YAxis
} from "recharts"
import Loader from '../Loader/Loader';
import { styles } from '@/app/styles/style';

type Props = {}

const CourseAnalytics = (props: Props) => {
    const {data, isLoading, error} = useGetCourseAnalyticsQuery({});

    // const analyticsData = [
    //     {name: "Jan 2023", uv: 2},
    //     {name: "Feb 2023", uv: 4},
    //     {name: "March 2023", uv: 6},
    //     {name: "April 2023", uv: 8},
    //     {name: "May 2023", uv: 1},
    //     {name: "Jun 2023", uv: 5},
    //     {name: "July 2023", uv: 7},
    // ]

    const analyticsData: any = []

    data && data.courses.last12Months.forEach((analysis: any)=> {
        analyticsData.push({ name: analysis.month, uv: analysis.count })
    });

    const minValue = 0
  return (
    <>
        {isLoading ? (
            <Loader />
        ) : (
            <div className="h-screen">
                <div className="mt-[50px]">
                    <h1 className={`${styles.title} px-5 !text-start`}>
                        Courses Analytics
                    </h1>
                    <p className={`${styles.label} px-5`}>
                        Last 12 months analytics data {" "}
                    </p>
                </div>
                <div className="w-full h-[90%] flex items-center justify-center">
                    <ResponsiveContainer width="90%" height="50%">
                        <BarChart width={150} height={300} data={analyticsData}>
                            <XAxis dataKey="name">
                                <Label offset={0} position="insideBottom" />
                            </XAxis>
                            <YAxis domain={[minValue, "auto"]}>
                                <Bar dataKey="uv" fill="#3faf82">
                                    <LabelList dataKey="uv" position="top" />
                                </Bar>
                            </YAxis>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        )}
    </>
  )
}

export default CourseAnalytics