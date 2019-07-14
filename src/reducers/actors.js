export const actors = (actors = [], action) => {
    if (action.type === 'ACTORS_LOADED') {
        return action.actors;
    } else if (action.type === 'ADD_ACTOR') {
        return [
            ...actors,
            action.actor
        ];
    }
    return actors;
}