import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ restricted, ...rest }) => {
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  console.log("PublicRoute", isAuthenticated);
  if (isAuthenticated && restricted) {
    return <Redirect to="/notes" />;
  }
  return <Route {...rest} />;
};

export default PublicRoute;
