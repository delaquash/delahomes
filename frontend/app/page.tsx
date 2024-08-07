"use client"
import React, {FC, useState} from 'react';
import Heading from './utils/Heading';
import Header from './components/Header';

interface Props {}

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
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
      />
    </div>
  )
}

export default Page