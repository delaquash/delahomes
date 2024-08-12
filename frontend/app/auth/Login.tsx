"use client"
import { useFormik } from 'formik';
import React, { FC, useState } from 'react';
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

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
    })
  return (
    <div>Login</div>
  )
}

export default Login