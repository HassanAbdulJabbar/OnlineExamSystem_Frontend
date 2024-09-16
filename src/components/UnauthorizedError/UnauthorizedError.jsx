import React from "react";
import { useNavigate } from "react-router-dom";
import "./UnauthorizedError.css";

const UnauthorizedError = () => {
  const navigate = useNavigate();

  const handleLogIn = async () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("userType");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <>
      <h1 className="text-center mt-5 warning">
        You are not authorized to access this page!
      </h1>
      <h5 className="text-center mt-4">
        The content is protected. Please log-in to access this page
      </h5>
      <div className="btn-alignment">
        <button
          className="btn btn-lg btn-outline-primary"
          onClick={() => handleLogIn()}
        >
          Log-In
        </button>
      </div>
    </>
  );
};

const UnmatchedUserRole = () => {
  const navigate = useNavigate();

  const handleLogIn = async () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("userType");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <>
      <h1 className="text-center mt-5 warning">
        User Role selected and Logged User Role does not match!
      </h1>
      <h5 className="text-center mt-4">
        Please select correct user role and try again to login. Thanks!
      </h5>
      <div className="btn-alignment">
        <button
          className="btn btn-lg btn-outline-primary"
          onClick={() => handleLogIn()}
        >
          Log-In
        </button>
      </div>
    </>
  );
};

export { UnauthorizedError, UnmatchedUserRole };
