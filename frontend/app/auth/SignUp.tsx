"use client";
import { useFormik } from "formik";
import React, { FC, useState } from "react";
import * as Yup from "yup";
import { AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { styles } from "../styles/style";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

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

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: YupSchema,
    onSubmit: async ({ email, password }) => {
      console.log(email, password);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Learning with DelaCourse</h1>
      <form onSubmit={handleSubmit}>
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
          {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block">{errors.password}</span>
          )}
        </div>
        {/* <div className="w-full mt-5"></div> */}
        <div className="w-full mt-5">
          <input type="submit" className={`${styles.button}`} value="Login" />
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
            onClick={()=> setRoute("Sign-Up")}
          >
            Sign In
          </span>
        </h4>
      </form>
    </div>
  );
};

export default SignUp;
