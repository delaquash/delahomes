"use client"
import React from 'react';
import AdminSideBar from "@/app/components/admin/sidebar/AdminSideBar"
import Heading from '@/app/utils/Heading';

import DashboardHeader from '@/app/components/admin/DashboardHeader';
import EditCourse from '@/app/components/admin/Course/EditCourse';

type Props = {}

const page = ({params}: any) => {
  const id = params?.id
  return (
    <div>
        <Heading
          title="DelaCourse E-Learning Platform"
          description='This is a platform for determined minds to learn software engineering and tech related course'
          keywords='Software Engineering, Machine Learning, Data Structure and Algorithms, Database, Backend, Frontend'
        />
        <div className="flex">
            <div className="1500px:w-[16%] w-1/5">
                <AdminSideBar />
            </div>
            <div className="w-[85%]">
                <DashboardHeader />
                <EditCourse id={id}/>
            </div>
        </div>
    </div>
  )
}

export default page