import React from "react";
import {
  LoggedUserRole,
  UserRole,
  token,
} from "../../services/userState.service";
import {
  UnauthorizedError,
  UnmatchedUserRole,
} from "../UnauthorizedError/UnauthorizedError";

const ProtectedRoute = ({ Component, role }) => {
  let component;

  if (UserRole === LoggedUserRole && token !== null) {
    component = <Component />;
  } else if (UserRole !== LoggedUserRole) {
    component = <UnmatchedUserRole />;
  } else {
    component = <UnauthorizedError />;
  }

  return <>{component}</>;
};

export default ProtectedRoute;
