import { combineReducers } from 'redux';
import { actors } from './actors';
import { stage } from './stage';

const initialized = (initialized = false, action) => {
    if (action.type === 'INITIALIZE') {
        return true;
    }
    return initialized;
}

export const appReducer = combineReducers({
    initialized,
    actors,
    stage
});
