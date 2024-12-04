import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
 import LoginImg from '../../images/loginimg.jpg'

const LoginScreen = () => {
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
    onSubmit: (values) => {
      console.log("Form values:", values);
    },
  });

  return (
    <div className="login-container">

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
