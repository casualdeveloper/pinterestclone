export const userLikePin = (state, action) => {
    const { pinId, pin } = action.payload;
    let pinned = [];
    
    if(state.pinned && state.pinned instanceof Array)
        pinned = state.pinned.slice(0);
    
    let pinIndex = pinned.indexOf(pinId);

    if(pinIndex !== -1)
        return { ...state };

    pinned.splice(0, 0, pinId);
    
    let pins = state.pinnedData.pins.slice(0);
    pins.splice(0, 0, pin);

    let pinnedData = {
        ...state.pinnedData,
        pins,
        lastPinIndex: state.pinnedData.lastPinIndex + 1
    }

    return {
        ...state,
        pinned,
        pinnedData
    }
}