import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home, Login, PrivateRoute, AppBar } from "..";
import Actors from '../../containers/Actors';

const mapStateToProps = (state) => ({
    initialized: state.initialized
});

const AppRouterInt = ({ initialized }) => (
    <BrowserRouter>
        <AppBar />
        {initialized ? <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/actors" component={Actors} />
            <PrivateRoute exact path="/" component={Home} />
        </Switch> : <div>Инициализация...</div>}
    </BrowserRouter>
);

export const AppRouter = connect(mapStateToProps)(AppRouterInt);
