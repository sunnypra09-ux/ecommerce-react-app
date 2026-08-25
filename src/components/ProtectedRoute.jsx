import React from "react";
import { useAuth, SignIn } from "@clerk/react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
