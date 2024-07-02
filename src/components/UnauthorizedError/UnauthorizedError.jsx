import React from "react";

const UnauthorizedError = () => {
  return (
    <>
      <h1 className="text-center mt-5">
        You are not authorized to access this page!
      </h1>
      <p className="text-center mt-4">Please logged in to access this page</p>
    </>
  );
};

export default UnauthorizedError;
