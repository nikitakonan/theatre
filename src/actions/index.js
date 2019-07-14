export const initialize = () => ({ type: 'INITIALIZE' });
export const setActors = (actors) => ({ type: 'SET_ACTORS', actors });
export const addActor = (actor) => ({ type: 'ADD_ACTOR', actor });
export const toggleEditMode = () => ({ type: 'TOGGLE_EDIT_MODE' });
export const selectActor = (actor) => ({ type: 'SELECT_ACTOR', actor });
