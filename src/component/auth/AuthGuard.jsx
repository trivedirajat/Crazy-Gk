import React from "react";
import { Navigate } from "react-router-dom";
import { jwtconfig } from "utils/Global";

const AuthGuard = ({ children }) => {
  const token = localStorage.getItem(jwtconfig.accessTokenStorageKey);

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default AuthGuard;
