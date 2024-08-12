import React, { useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";

import { endpoints } from "../../endpoints";
import "./Auth.css";

const initialValue = {
  name: "",
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const UserRole = localStorage.getItem("userType");

  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [login, setLogin] = useState(true);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const submit = async (values) => {
    const apiEndpoint = login ? endpoints.auth.signin : endpoints.auth.signup;

    try {
      const response = await axios.post(apiEndpoint, {
        ...values,
        UserRole,
      });

      console.log(response);

      if (login) {
        localStorage.setItem("id", response.data.existingUser._id);
        localStorage.setItem("name", response.data.existingUser.name);
        localStorage.setItem("token", response.data.token);

        if (UserRole === "Teacher") {
          navigate("/welcome");
        } else if (UserRole === "Student") {
          navigate("/welcomee");
        } else {
          navigate("/welcomeee");
        }
      } else {
        reset(initialValue);
        setSignupSuccess(true);

        setTimeout(() => {
          setSignupSuccess(false);

          setLogin(true); // Switch to the login view
          navigate("/login"); // Redirect to login page
        }, 2000); // Redirect after a delay (adjust as needed)
      }

      setEmailError("");
      setPasswordError("");
    } catch (error) {
      if (error.response?.status === 400 || error.response?.status === 404) {
        setPasswordError(error.response.data.message);
      } else if (error.response?.status === 401) {
        setEmailError(error.response.data.message);
      } else if (error.response?.status === 402) {
        setPasswordError(error.response.data.message);
      }
    }
  };

  return (
    <div className="login-background">
      <div className="inner-div row">
        <div className="col-7 left-side mt-1 mx-4"></div>
        <div
          className="col-5"
          style={{ backgroundColor: "skyblue", borderRadius: "30px" }}
        >
          {login ? (
            <form className="login-form" onSubmit={handleSubmit(submit)}>
              <h1 className="mb-3 header">Sign In</h1>
              <span className="text-center">
                <span>
                  Don't have an account, no worries <br />
                </span>
                <Link to="/Login" onClick={() => setLogin(false)}>
                  click here
                </Link>
                <span> to register</span>
              </span>{" "}
              <br />
              <input
                type="email"
                placeholder="Email"
                className="mt-5 text-fields"
                style={{ borderRadius: "30px", border: "none" }}
                {...register("email", {
                  required: "Email is required",
                })}
              />
              <p className="ms-2 mt-2 warnings">
                {errors.email && errors.email.message}
              </p>
              <input
                type="password"
                placeholder="Password"
                className="mt-2 text-fields"
                style={{ borderRadius: "30px", border: "none" }}
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <p className="ms-2 mt-2 warnings">
                {errors.password && errors.password.message}
              </p>
              <p className="warnings">{passwordError}</p>
              <button
                type="submit"
                className="btn btn-primary judtify-content-end"
              >
                Sign In
              </button>
            </form>
          ) : (
            <form className="login-form" onSubmit={handleSubmit(submit)}>
              <h1 className="mb-2 header">Sign Up</h1>
              <span className="text-center">
                <span>
                  Please enter your information or <br />
                </span>
                <Link to="/Login" onClick={() => setLogin(true)}>
                  Click here
                </Link>
                <span>&nbsp; if you already have an account :)</span>
              </span>
              <input
                type="text"
                placeholder="Name"
                className="mt-4 text-fields"
                style={{ borderRadius: "30px", border: "none" }}
                {...register("name", {
                  required: "Name is required",
                })}
              />
              <p className="ms-2 mt-2 warnings">
                {errors.name && errors.name.message}
              </p>
              <input
                type="email"
                placeholder="Email"
                className="mt-2 text-fields"
                style={{ borderRadius: "30px", border: "none" }}
                {...register("email", {
                  required: "Email is required",
                })}
              />
              <p className="ms-2 mt-2 warnings">
                {errors.email && errors.email.message}
                {!errors.email && emailError}
              </p>
              <input
                type="password"
                placeholder="Password"
                className="mt-2 text-fields"
                style={{ borderRadius: "30px", border: "none" }}
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <p className="ms-2 mt-2 warnings">
                {errors.password && errors.password.message}
              </p>
              <input
                type="password"
                placeholder="Confirm Password"
                className="mt-2 text-fields"
                style={{ borderRadius: "30px", border: "none" }}
                {...register("confirmPassword", {
                  required: "",
                })}
              />
              <p className="ms-2 mt-2 warnings">
                {errors.confirmPassword && errors.confirmPassword.message}
                {!errors.confirmPassword && passwordError}
              </p>
              <button
                type="submit"
                className="mt-1 login-button btn btn-primary"
              >
                Sign Up
              </button>
              {signupSuccess && (
                <Alert variant="success" className="mt-3">
                  Successfully signed up! Redirecting to login page...
                </Alert>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
