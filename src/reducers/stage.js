import { model } from '../components/Stage/stageModel';

const seats = model
    .flat()
    .map(({ id, row, seat }) => ({ id, row, seat }))
    .reduce((acc, { id, ...rest }) => {
        acc[id] = rest;
        return acc;
    }, {});

const initialState = {
    isEditMode: false,
    selectedActor: null,
    seats
}

export const stage = (stage = initialState, action) => {
    if (action.type === 'TOGGLE_EDIT_MODE') {
        return {
            ...stage,
            isEditMode: !stage.isEditMode
        };
    } else if (action.type === 'SELECT_ACTOR') {
        return {
            ...stage,
            selectedActor: action.actor
        };
    }
    return stage;
}
