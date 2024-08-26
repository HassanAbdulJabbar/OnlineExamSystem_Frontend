import React from "react";
import { useNavigate } from "react-router-dom";

const UserRole = () => {
  const navigate = useNavigate();

  return (
    <div className="login-background">
      <div className="row justify-content-center">
        <h1
          className="text-center mb-5 user-role"
          style={{ color: "darkblue", fontSize: "50px" }}
        >
          <strong>What is your role?</strong>
        </h1>
        <div className="col-auto">
          <button
            type="button"
            className="button-style btn btn-primary btn-lg"
            onClick={() => {
              localStorage.removeItem("id");
              localStorage.removeItem("token");
              localStorage.removeItem("name");
              localStorage.setItem("userType", "admin");
              navigate("/login");
            }}
          >
            Admin
          </button>
        </div>
        <div className="col-auto ">
          <button
            className="button-style btn btn-primary btn-lg"
            onClick={() => {
              localStorage.removeItem("id");
              localStorage.removeItem("token");
              localStorage.removeItem("name");
              localStorage.setItem("userType", "Teacher");
              navigate("/login");
            }}
          >
            Teacher
          </button>
        </div>
        <div className="col-auto ">
          <button
            className="button-style btn btn-primary btn-lg"
            onClick={() => {
              localStorage.removeItem("id");
              localStorage.removeItem("token");
              localStorage.removeItem("name");
              localStorage.setItem("userType", "Student");
              navigate("/login");
            }}
          >
            Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserRole;
