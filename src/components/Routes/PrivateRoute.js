import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
    console.log(isAuthenticated)
    return (
        <Route {...rest} render={props => {
            if (isAuthenticated) {
                return <Component {...props} />
            }
            else {
                return <Redirect to="/login" />
            }
        }} />
    );
};

export default PrivateRoute;