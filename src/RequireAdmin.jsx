import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAdmin = () => {
  const isLoggedIn = localStorage.length == 0 ? false : true;
  const isAdmin =
    localStorage.getItem("role") == "USER" ||
    localStorage.getItem("role") == undefined
      ? false
      : true;
  const location = useLocation();

  return isLoggedIn && isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};

export default RequireAdmin;
