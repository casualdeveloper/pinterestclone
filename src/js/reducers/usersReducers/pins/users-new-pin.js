import { getPins, updateUser } from "../utils";

export const newPin = (state, action) => {
    let pin = action.payload.pin;
    let userId = pin.owner;
    let pins = getPins(state, userId);
    pins.splice(0, 0, pin);
    let lastPinId = pins[pins.length - 1]._id;
    return {
        ...state,
        [userId]: updateUser(state, userId, { pins, lastPinId })
    };
};