import React from "react";
import { useAuth, SignIn } from "@clerk/react";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <SignIn />;
  }

  return children;
};

export default ProtectedRoute;
