import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const theme = sessionStorage.getItem("complaintuser");
  return theme ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
