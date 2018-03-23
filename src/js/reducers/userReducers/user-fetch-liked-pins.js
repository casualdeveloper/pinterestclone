export const fetchLikedPins = (state, action) => {
    let oldPins = state.pinnedData.pins.slice(0);
    let pins = oldPins.concat(action.payload.pins);

    if(pins.length === 0)
        return {...state};

    let lastPinIndex = state.pinnedData.lastPinIndex + action.payload.pins.length;

    let pinnedData = {
        ...state.pinnedData,
        pins,
        lastPinIndex
    }
    return {
        ...state,
        pinnedData
    }
}


export const fetchLikedPinsPending = (state, action) => {
    let pinnedData = {
        ...state.pinnedData,
        fetchingPins: action.payload
    }
    return {
        ...state,
        pinnedData
    };
};