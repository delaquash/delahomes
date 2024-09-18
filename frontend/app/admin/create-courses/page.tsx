"use client"
import React from 'react';
import AdminSideBar from "@/app/components/admin/sidebar/AdminSideBar"
import Heading from '@/app/utils/Heading';
import CreateCourse from "@/app/components/admin/Course/CreateCourse";
import DashboardHeader from '@/app/components/admin/DashboardHeader';


type Props = {}

const page = (props: Props) => {
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
                <CreateCourse />
            </div>
        </div>
    </div>
  )
}

export default page