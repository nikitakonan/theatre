const initialState = {
    isEditMode: false,
    selectedActor: null
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
