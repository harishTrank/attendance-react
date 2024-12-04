import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoginImg from "../../images/loginimg.jpg";
import { userLoginApi } from "../../store/Services";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { globalUserType } from "../../JotaiStore";
import { useAtom } from "jotai";
import FullScreenLoader from "../../ReuseableComponent/FullScreenLoader";

const LoginScreen = () => {
  const navigation: any = useNavigate();
  const [, setGlobalUserTypeAtom] = useAtom(globalUserType);
  const [isLoading, setIsLoading]: any = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (body) => {
      console.log("Form values:", body);
      setIsLoading(true);
      userLoginApi({
        body,
      })
        .then((res: any) => {
          sessionStorage.setItem("accessToken", res?.token?.access);
          sessionStorage.setItem("userType", res?.user_type);
          sessionStorage.setItem("userId", res?.userid);
          setGlobalUserTypeAtom(res?.user_type);
          toast.success(res?.responsemessage);
          if (res?.user_type === "Admin") {
            navigation("/", {
              userType: res?.user_type,
              userId: res?.userid,
            });
          } else {
            navigation("/employee-dashboard", {
              userType: res?.user_type,
              userId: res?.userid,
            });
          }
          setIsLoading(false);
        })
        .catch((err: any) => {
          toast.error(err?.data?.message);
          setIsLoading(false);
        });
    },
  });

  return (
    <div className="login-container">
      <FullScreenLoader loading={isLoading} />
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group-login">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="form-group-login">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>

      <div className="login-image">
        <img src={LoginImg} alt="Login Illustration" />
      </div>
    </div>
  );
};

export default LoginScreen;
