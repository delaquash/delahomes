"use client";
import React from "react";
import Heading from "@/app/utils/Heading";
import AdminSideBar from "@/app/components/admin/sidebar/AdminSideBar";
import DashboardHero from "@/app/components/admin/DashboardHero";
import AdminProtected from "@/app/hooks/useAdminProtected"
import AllUsers from "@/app/components/admin/User/AllUsers"
type Props = {};

const page = (props: Props) => {
  return (
    <>
    <div>
      <AdminProtected>
      <Heading
        description="An online platform where student can learn and interact with a teachers and get real time solution"
        title="ELearning -- Admin"
        keywords="Programming, Software Engineering, Machine Learning, JavaScript, Python"
      />
      <div className="flex h-[200vh]">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSideBar />
        </div>
        <div className="w-[85%]">
          <DashboardHero />
          
          <AllUsers isTeam={true}/>
        </div>
      </div>
      </AdminProtected>
    </div>
    </>
  );
};

export default page;
