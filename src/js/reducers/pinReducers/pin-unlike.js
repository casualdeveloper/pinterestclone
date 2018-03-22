export const unlikePin = (state, action) => {
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
    
    if(!pin.pinnedBy || pin.pinnedBy.length === 0){
        return  {...state };
    }

    let userIndex = pin.pinnedBy.indexOf(userId);

    if(userIndex === -1) {
        return { ...state };
    }

    pin.pinnedBy.splice(userIndex, 1);
    pins[pinIndex] = pin;

    return {
        ...state,
        pins
    }
}