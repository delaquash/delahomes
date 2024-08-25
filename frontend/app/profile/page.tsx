"use client"
import React, { FC, useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ProtectedRoute from "../hooks/useProtected";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";

interface Props {}

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any)=> state.auth)  
  return (
    <div>
      {" "}
      <ProtectedRoute>
        <Heading
            title={`${user?.name} profile` }
            description="This is a platform for determined minds to learn software engineering and tech related course"
            keywords="Software Engineering, Machine Learning, Data Structure and Algorithms, Database, Backend, Frontend"
        />
        <Header
            open={open}
            setOpen={setOpen}
            activeItem={activeItem}
            setRoute={setRoute}
            route={route}
        />
        <Profile 
            user={user}
        />
      </ProtectedRoute>
    </div>
  );
};

export default Page;
