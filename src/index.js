import { render } from 'react-dom';
import React  from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import { createStore } from 'redux';
import { init } from './api';
import { appReducer } from './reducers';
import { AuthButton, PrivateRoute, Actors, Login, Home } from "./components/";
import './index.css';

const store = createStore(appReducer);

store.subscribe(() => {
    console.log(store.getState());
    render(<AppRouter/>, document.getElementById('root'));
});

init(() => {
    store.dispatch({
        type: 'INITIALIZE'
    });
});

render(<AppRouter/>, document.getElementById('root'));

function AppRouter() {
    const state = store.getState();
    if (!state.initialized) {
        return <div>Not initialized</div>
    }
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
