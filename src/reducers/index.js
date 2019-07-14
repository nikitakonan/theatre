import { combineReducers } from 'redux';
import { actors } from './actors';

const initialized = (initialized = false, action) => {
    if (action.type === 'INITIALIZE') {
        return true;
    }
    return initialized;
}

export const appReducer = combineReducers({
    initialized,
    actors
});
