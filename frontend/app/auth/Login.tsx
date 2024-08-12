"use client"
import { useFormik } from 'formik';
import React, { FC, useState } from 'react';
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { styles } from "../styles/styles";

type Props = {
    setRoute: (route: string) => void;
}

const YupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Please enter your email!'),
    password: Yup.string().required('Please enter your password!').min(6)
})

const Login:FC<Props> = (props: Props) => {
    const [show, setShow] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "", password: ""
        },
        validationSchema: YupSchema,
        onSubmit: async({ email, password}) => {
            console.log(email, password)
        }
    });

    const { errors, touched, values, handleChange, handleSubmit} = formik;
  return (
    <div className='w-full'>
        <h1 className={`${styles.title}`}>
            Learning with DelaCourse
        </h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email" className={`${styles.label}`}>
                Enter your Email
            </label>
            <input 
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder='Please type your email'
                className={`${errors.email && touched.email && "border-red-500"} w-full text-black dark:text-white bg-transparent rounded h-[40px] px-2 outline-none mt-[10px font-Poppins]`}
            />
        </form>
    </div>
  )
}

export default Login