import { render } from 'react-dom';
import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, withRouter, Switch, NavLink } from 'react-router-dom';
import { getUser, init, signOut } from "./api";
import './index.css';
import { Home } from "./Home/Home";
import { Login } from "./Login/Login";
import { Actors } from "./Actors/Actors";

init(() => {
    render(<AppRouter/>, document.getElementById('root'));
});

const AuthButton = withRouter(({ history }) => {
    const user = getUser();
    return user != null
        ? (<p>
            Welcome {user.email}{" "}
            <button onClick={() => {
                signOut().then(() => {
                    history.push('/');
                })
            }}>Sign Out
            </button>
        </p>)
        : (<p>You are not logged in</p>);
    }
);

function AppRouter() {
    return (
        <BrowserRouter>
            <div className="header">
                <ul className="menu">
                    <li className="menu-item">
                        <NavLink to="/home">Home</NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink to="/actors">Actors</NavLink>
                    </li>
                </ul>
                <AuthButton/>
            </div>
            <Switch>
                <Route exact path="/login" component={Login}/>
                <PrivateRoute exact path="/actors" component={Actors}/>
                <PrivateRoute exact path="/home" component={Home}/>
                <PrivateRoute exact path="/" component={Home}/>
            </Switch>
        </BrowserRouter>
    );
}

function PrivateRoute({ component: Component, ...rest }) {
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
}
