export const fetchPins = (state, action) => {
    let oldPins = state.pins;
    let pins = oldPins.concat(action.payload.pins);
    //get last pins id
    let lastPinId = action.payload.pins[action.payload.pins.length - 1]._id;
    return {
        ...state,
        pins,
        lastPinId
    }
}

export const fetchPinsPending = (state, action) => {
    return {
        ...state,
        fetchingPins: action.payload
    }
}

export const fetchPinsFailed = (state, action) => {
    return {
        ...state,
        fetchPinsFailed: action.payload
    }
}