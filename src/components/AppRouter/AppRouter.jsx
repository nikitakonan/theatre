import { AppBar, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import { AuthButton, Home, Login, PrivateRoute } from "..";
import Actors from '../../containers/Actors';

function AppRouter({ initialized }) {
    if (!initialized) {
        return <div>Инициализация...</div>
    }
    return (
        <BrowserRouter>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flex: 1 }}>
                        ТЕАТР
                    </Typography>
                    <NavLink className="nav-link" to="/home">СЦЕНА</NavLink>
                    <NavLink className="nav-link" to="/actors">АКТЕРЫ</NavLink>
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

const mapStateToProps = (state) => ({
    initialized: state.initialized
})

AppRouter = connect(mapStateToProps)(AppRouter);

export { AppRouter };
