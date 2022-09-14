import React from "react";
import { Navigate } from "react-router-dom";

import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AuthMiddleware = () => {
  const { auth } = useAuth();
  console.log(auth);
  return auth?.accessToken ? <Outlet /> : <Navigate to={"/login"} />;
};

export default AuthMiddleware;
