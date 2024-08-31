import React from "react";

const ProtectedRoute = ({ Component, role, unauthorizedAccess }) => {
  const userRole = localStorage.getItem("userType");
  const token = localStorage.getItem("token");
  let component;

  if (userRole === role && token !== null) {
    component = <Component />;
  } else {
    component = (
      <h1 className="text-center mt-5">
        You are not authorized to access this page
      </h1>
    );
  }

  return <>{component}</>;
};

export default ProtectedRoute;
