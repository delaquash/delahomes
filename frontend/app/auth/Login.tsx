"use client";
import { useFormik } from "formik";
import React, { FC, useState } from "react";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { style } from "../styles/styles";

type Props = {
  setRoute: (route: string) => void;
};

const YupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const Login: FC<Props> = (props: Props) => {
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
      <h1 className={`${style.title}`}>Learning with DelaCourse</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className={`${style.label}`}>
          Enter your Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Please type your email"
          className={`${errors.email && touched.email && "border-red-500"} ${
            style.input
          }`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}
        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="password" className={`${style.label}`}>
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
            } ${style.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible size={20} onClick={() => setShow(true)} />
          ) : (
            <AiOutlineEye size={20} onClick={() => setShow(true)} />
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
