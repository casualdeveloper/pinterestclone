import { getPins, updateUser } from "../utils";

export const deletePin = (state, action) => {
    let pinId = action.meta.passedData.pinId;
    let ownerId = action.meta.passedData.owner._id;
    let pins = getPins(state, ownerId);
    let lastPinId;
    for(let i = 0; i < pins.length; i++){
        if(pins[i]._id === pinId){
            pins.splice(i,1);
            lastPinId = (pins.length > 0)?pins[pins.length - 1]._id:null;
            break;
        }
    }
    return {
        ...state,
        [ownerId]: updateUser(state, ownerId, { pins, lastPinId })
    };
};