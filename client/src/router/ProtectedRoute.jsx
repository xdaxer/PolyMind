import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { PolyMindContext } from "../context/context";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, user } = useContext(PolyMindContext);

  if (!isLoggedIn && !user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
