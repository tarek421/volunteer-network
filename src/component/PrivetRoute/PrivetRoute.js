import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../../App";

export default function PrivateRoute({ children }) {
  const [loggedInUser] = useContext(userContext);
  const user = loggedInUser?.isSignIn;

  console.log("Check user in Private: ", user);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}