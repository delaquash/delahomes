"use client";
import { useFormik } from "formik";
import React, { FC, useEffect, useState } from "react";
import * as Yup from "yup";
import { AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { styles } from "../styles/style";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
};

const YupSchema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const SignUp: FC<Props> = ({setRoute}) => {
  const [show, setShow] = useState(false);
  const [register, {data,error,isSuccess,isError}] = useRegisterMutation();

  useEffect(()=> {
    if(isSuccess) { 
      const message = data?.message || "Registration Successful"
      toast.success(message)
      setRoute("Verification")
    }
    if(error) {
      if("data" in error){
        const errorData = error as any;
        const message = errorData.data?.message || "Registration Failed"
        toast.error(message)
      }
    }
  },[isSuccess, error, setRoute, data?.message])

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: YupSchema,
    onSubmit: async ({ name, email, password }) => {
      const data = {
        name,
        email,
        password,
      }
      await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Sign Up</h1>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
      <label htmlFor="name" className={`${styles.label}`  }>
          Enter your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Please type your name"
          className={`${errors.name && touched.name && "border-red-500"} ${styles.input}`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.name}</span>
        )}
      </div>
        <label htmlFor="email" className={`${styles.label}`  }>
          Enter your Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Please type your email"
          className={`${errors.email && touched.email && "border-red-500"} ${styles.input}`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}
        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="password" className={`${styles.label}`}>
            Enter your Password
          </label>
          <input
            type={!show ? "password" : "text"}
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Please type your password"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible 
              size={20} 
              onClick={() => setShow(true)} 
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
            />
          ) : (
            <AiOutlineEye
               className="absolute bottom-3 right-2 z-1 cursor-pointer"
               size={20} 
               onClick={() => setShow(false)} 
            />
          )}
          <div>
          {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block">{errors.password}</span>
          )}
          </div>
        </div>
        {/* <div className="w-full mt-5"></div> */}
        <div className="w-full mt-5">
          <input type="submit" className={`${styles.button}`} value="Sign Up" />
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[18px] text-black dark:text-white">
          Or join with
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer mr-2" />
            <AiFillGithub size={30} className="cursor-pointer ml-2" />
        </div>
        <h4 className="text-center pt-4 font-Poppins text-[16px]">
          ALready have an account? {" "}
          <span 
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={()=> setRoute("Login")}
          >
            Sign In
          </span>
        </h4>
      </form>
    </div>
  );
};

export default SignUp;


// 31701843