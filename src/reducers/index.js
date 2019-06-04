const initial = {
    initialized: false
};

export const appReducer = (state = initial, action) => {
    if (action.type === 'INITIALIZE') {
        return {
            ...state,
            initialized: true,
        };
    } else {
        return state;
    }
};
