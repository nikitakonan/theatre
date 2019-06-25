import { render } from 'react-dom';
import React from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import { createStore } from 'redux';
import { init } from './api';
import { appReducer } from './reducers';
import { AuthButton, PrivateRoute, Actors, Login, Home } from "./components/";
import { initialize } from "./actions";
import './index.css';
import { AppBar, Toolbar, Typography, Link } from '@material-ui/core';

const store = createStore(appReducer);

store.subscribe(() => {
    render(<AppRouter />, document.getElementById('root'));
});

init(() => {
    store.dispatch(initialize());
});

render(<AppRouter />, document.getElementById('root'));

function AppRouter() {
    const state = store.getState();
    if (!state.initialized) {
        return <div>Not initialized</div>
    }
    return (
        <BrowserRouter>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flex: 1 }}>
                        Theatre
                    </Typography>
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/actors">Actors</NavLink>
                    <AuthButton />
                </Toolbar>
            </AppBar>
            <Switch>
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/actors" component={Actors} />
                <PrivateRoute exact path="/home" component={Home} />
                <PrivateRoute exact path="/" component={Home} />
            </Switch>
        </BrowserRouter>
    );
}
