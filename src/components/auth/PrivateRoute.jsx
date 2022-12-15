import React from "react";
import { useAuthContext } from "../../store/authContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useAuthContext();

  if (user.isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
