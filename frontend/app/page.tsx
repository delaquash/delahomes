"use client"

import React, {FC, useState} from 'react';
import Heading from './utils/Heading';

interface Props {}

const page: FC<Props> = () => {
  return (
    <div>
      <Heading
          title="DelaCourse E-Learning Platform"
          description='This is a platform for determined minds to learn software engineering and tech related course'
          keywords='Software Engineering, Machine Learning, Data Structure and Algorithms, Database, Backend, Frontend'
      
      />
    </div>
  )
}

export default page