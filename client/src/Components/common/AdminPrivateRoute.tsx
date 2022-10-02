import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const theme = sessionStorage.getItem("complaintadmin");
  return theme ? <Outlet /> : <Navigate to="/admin" />;
};

export default PrivateRoute;
