import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { init } from './api';
import { appReducer } from './reducers';
import { initialize } from "./actions";
import { AppRouter } from './components';
import './index.css';

const store = createStore(appReducer);

init(() => {
    store.dispatch(initialize());
});

render(
    <Provider store={store}>
        <AppRouter />
    </Provider>,
    document.getElementById('root')
);
