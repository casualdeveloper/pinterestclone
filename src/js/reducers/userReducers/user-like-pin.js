export const userLikePin = (state, action) => {
    const { pinId } = action.payload;
    let pinned = [];
    
    if(state.pinned && state.pinned instanceof Array)
        pinned = state.pinned.slice(0);
    
    let pinIndex = pinned.indexOf(pinId);

    if(pinIndex !== -1)
        return { ...state };

    pinned.push(pinId);

    return {
        ...state,
        pinned
    }
}