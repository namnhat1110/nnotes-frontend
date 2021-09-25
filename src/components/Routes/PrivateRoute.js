import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ ...rest }) => {
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  console.log("PrivateRoute", isAuthenticated);
  console.log("PrivateRoute", rest.path);
  if (isAuthenticated) return <Route {...rest} />;
  delete rest.component;
  return <Route {...rest} render={(props) => <Redirect to="/login" />} />;
};

export default PrivateRoute;
