export const actors = (actors = [], action) => {
    if (action.type === 'SET_ACTORS') {
        return action.actors;
    } else if (action.type === 'ADD_ACTOR') {
        return [
            ...actors,
            action.actor
        ];
    }
    return actors;
}