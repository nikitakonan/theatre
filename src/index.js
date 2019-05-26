import { render } from 'react-dom';
import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect, withRouter, Switch } from 'react-router-dom';
import { getUser, init, signOut } from "./api";
import './index.css';
import { Home } from "./Home/Home";
import { Login } from "./Login/Login";

init(() => {
    render(<AppRouter/>, document.getElementById('root'));
});

const AuthButton = withRouter(({ history }) => {
    const user = getUser();
    return user != null
        ? (<p style={{ float: 'right' }}>
            Welcome {user.email}{" "}
            <button onClick={() => {
                signOut().then(() => {
                    history.push('/');
                })
            }}>Sign Out
            </button>
        </p>)
        : (<p style={{ float: 'right' }}>You are not logged in</p>);
    }
);

function AppRouter() {
    return (
        <BrowserRouter>
            <div>
                <AuthButton/>
                <ul style={{ display: 'inline-block' }}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
            </div>
            <Switch>
                <PrivateRoute exact path="/" component={Home}/>
                <Route exact path="/login" component={Login}/>
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
