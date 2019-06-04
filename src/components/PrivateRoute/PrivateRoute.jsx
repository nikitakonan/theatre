import { getUser } from "../../api";
import { Redirect, Route } from "react-router-dom";
import React from "react";

export const PrivateRoute = ({ component: Component, ...rest }) => {
    const user = getUser();
    return (
        <Route {...rest} render={props =>
            user != null
                ? (<Component {...props}/>)
                : (<Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}/>)
        }/>
    );
};
