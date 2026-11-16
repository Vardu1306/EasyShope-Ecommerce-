
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PublicOnlyRoute = ({ children }) => {
  const { isLoggedIn, isAdmin } = useContext(AuthContext);

  if (isLoggedIn) {
    return (
      <Navigate
        to={isAdmin ? "/admin/dashboard" : "/"}
        replace
      />
    );
  }

  return children;
};

export default PublicOnlyRoute;
