// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("authToken"); // token may be null or a string

  // Treat empty strings and the literal strings "null"/"undefined" as unauthenticated
  const isAuthenticated =
    Boolean(token) && token !== "null" && token !== "undefined";

  // Debugging help: will show in browser console so you can confirm value during navigation
  // Remove or guard this in production if desired
  // console.debug("ProtectedRoute: authToken=", token, "isAuthenticated=", isAuthenticated);

  if (!isAuthenticated) {
    // preserve where the user wanted to go so you can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
