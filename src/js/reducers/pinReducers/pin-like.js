export const likePin = (state, action) => {
    const { userId, pinId } = action.payload;
    let pins = state.pins.slice(0);

    let pinIndex = -1;

    for(let i = 0; i < pins.length; i++){
        if(pins[i]._id === pinId){
            pinIndex = i;
            break;
        }
    }

    if(pinIndex === -1) {
        return { ...state };
    }

    let pin = pins[pinIndex];

    if(!pin.pinnedBy)
        pin.pinnedBy = [];

    pin.pinnedBy.push(userId);
    pins[pinIndex] = pin;

    return {
        ...state,
        pins
    }
}