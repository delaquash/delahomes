import React, { FC, useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ProtectedRoute from "../hooks/useProtected";

interface Props {}

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      {" "}
      <ProtectedRoute>
        <Heading
            title="DelaCourse E-Learning Platform"
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
        <Hero />
      </ProtectedRoute>
    </div>
  );
};

export default Page;
