import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
    console.log(isAuthenticated)
    return (
        <Route {...rest} render={props => {
            if (isAuthenticated && restricted) {
                return <Redirect to="/notes" />
            }
            else {
                return <Component {...props} />
            }
        }} />
    );
};

export default PublicRoute;