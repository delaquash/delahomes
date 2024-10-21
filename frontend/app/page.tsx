"use client"
import React, {FC, useState} from 'react';
import Heading from './utils/Heading';
import Header from './components/Header';
import Hero from './components/Hero';
<<<<<<< HEAD
import Courses from './components/Routes/Courses';
import Reviews from './components/Routes/Reviews';
import Faq from './components/Faq/Faq';
import Footer from './components/Footer';
=======
>>>>>>> origin/frontend

interface Props {}

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
  const [route, setRoute] = useState("Login")
  return (
    <div>
      <Heading
          title="DelaCourse E-Learning Platform"
          description='This is a platform for determined minds to learn software engineering and tech related course'
          keywords='Software Engineering, Machine Learning, Data Structure and Algorithms, Database, Backend, Frontend'
      />
      <Header 
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Hero />
<<<<<<< HEAD
      <Courses />
      <Reviews />
      <Faq />
      <Footer />
=======
>>>>>>> origin/frontend
    </div>
  )
}

export default Page