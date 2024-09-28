"use client";
import React from "react";
import Heading from "../../utils/Heading";
import AdminSideBar from "../../components/admin/sidebar/AdminSideBar";
import DashboardHero from "../../components/admin/DashboardHero";
import AdminProtected from "../../hooks/useAdminProtected";
import OrderAnalytics from "../../components/Analytics/OrderAnalytics";
type Props = {};

const page = (props: Props) => {
  return (
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
          <OrderAnalytics />
        </div>
      </div>
      </AdminProtected>
    </div>
  );
};

export default page;