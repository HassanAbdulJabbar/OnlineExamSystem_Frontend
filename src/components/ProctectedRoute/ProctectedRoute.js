import React from "react";
import { UserRole, token } from "../../services/userState.service";
import UnauthorizedError from "../UnauthorizedError/UnauthorizedError";

const ProtectedRoute = ({ Component, role }) => {
  let component;

  if (UserRole === role && token !== null) {
    component = <Component />;
  } else {
    component = <UnauthorizedError />;
  }

  return <>{component}</>;
};

export default ProtectedRoute;
