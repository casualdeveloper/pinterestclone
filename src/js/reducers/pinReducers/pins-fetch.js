export const fetchPins = (state, action) => {
    let oldPins = state.pins.slice(0);
    let pins = oldPins.concat(action.payload.pins);
    //get last pins id
    if(pins.length === 0)
        return {...state};
    let lastPinId = pins[pins.length - 1]._id;
    return {
        ...state,
        pins,
        lastPinId
    };
};

export const fetchPinsPending = (state, action) => {
    return {
        ...state,
        fetchingPins: action.payload
    };
};

export const fetchPinsFailed = (state, action) => {
    return {
        ...state,
        fetchPinsFailed: action.payload
    };
};