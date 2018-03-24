export const userUnlikePin = (state, action) => {
    const { pinId } = action.payload;
    if(!state.pinned || state.pinned.length === 0)
        return { ...state };

    let pinned = state.pinned.slice(0);
    let pinIndex = pinned.indexOf(pinId);

    if(pinIndex === -1)
        return { ...state };

    pinned.splice(pinIndex, 1);

    let pins = state.pinnedData.pins.slice(0);
    pins.splice(pinIndex, 1);

    let pinnedData = {
        ...state.pinnedData,
        pins,
        lastPinIndex: (state.pinnedData.lastPinIndex > 0)?state.pinnedData.lastPinIndex - 1:0
    }

    return {
        ...state,
        pinned,
        pinnedData
    }
}