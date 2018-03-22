import { getUserId, getPins, updateUser } from "../utils";

export const fetchPins = (state, action) => {
    let userId = getUserId(action);
    //get users pins
    let oldPins = getPins(state, userId);
    let pins = oldPins.concat(action.payload.pins);

    if(pins && pins instanceof Array && pins.length === 0)
        return { ...state };

    //get last pin id
    let lastPinId = pins[pins.length - 1]._id;
    return {
        ...state,
        [userId]: updateUser(state, userId, {pins, lastPinId})
    };
};

export const fetchPinsPending = (state, action) => {
    let userId = getUserId(action);
    return {
        ...state,
        [userId]: updateUser(state, userId, { fetchPinsPending: action.payload })
    };
};

export const fetchPinsFailed = (state, action) => {
    let userId = getUserId(action);
    return {
        ...state,
        [userId]: updateUser(state, userId, { fetchPinsFailed: action.payload })
    };
};