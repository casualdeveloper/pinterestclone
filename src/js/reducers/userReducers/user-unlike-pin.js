export const userUnlikePin = (state, action) => {
    const { pinId } = action.payload;
    if(!state.pinned || state.pinned.length === 0)
        return { ...state };

    let pinned = state.pinned.splice(0);
    let pinIndex = pinned.indexOf(pinId);

    if(pinIndex === -1)
        return { ...state };

    pinned.splice(pinIndex, 1);

    return {
        ...state,
        pinned
    }
}