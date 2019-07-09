import { combineReducers } from 'redux';

const initialized = (initialized = false, action) => {
    if (action.type === 'INITIALIZE') {
        return true;
    }
    return initialized;
}

export const appReducer = combineReducers({
    initialized
});
