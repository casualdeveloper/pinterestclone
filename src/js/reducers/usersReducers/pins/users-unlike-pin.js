import {getPins, updateUser } from "../utils";

export const unlikePin = (state, action) => {
    let { pinId, userId } = action.payload;
    let ownerId = action.meta.passedData.owner._id;
    let pins = getPins(state, ownerId);

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
    let pinnedBy = [];

    if(pin.pinnedBy && pin.pinnedBy instanceof Array)
        pinnedBy = pin.pinnedBy.slice(0);

    let userIndex = pinnedBy.indexOf(userId);

    if(userIndex === -1)
        return { ...state };

    pinnedBy.splice(userIndex, 1);
    pin.pinnedBy = pinnedBy;

    pins[pinIndex] = pin;

    return {
        ...state,
        [ownerId]: updateUser(state, ownerId, { pins })
    };
};