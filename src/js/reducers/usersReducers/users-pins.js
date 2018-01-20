const getUserId = (action) => {
    return action.meta.passedData.userId;
}

const getPins = (state, userId) => {
    if(!state[userId])
        return [];

    if(!state[userId].pins)
        return [];

    return state[userId].pins.slice(0);
}

const updateUser = (state, userId, data) => {
    return {
        ...state[userId],
        ...data
    }
}

export const fetchPins = (state, action) => {
    let userId = getUserId(action);
    //get users pins
    let oldPins = getPins(state, userId);
    let pins = oldPins.concat(action.payload.pins);
    //get last pin id
    let lastPinId = action.payload.pins[action.payload.pins.length - 1]._id;
    return {
        ...state,
        [userId]: updateUser(state, userId, {pins, lastPinId})
    }
}

export const fetchPinsPending = (state, action) => {
    let userId = getUserId(action);
    return {
        ...state,
        [userId]: updateUser(state, userId, {fetchPinsPending: action.payload})
    }
}

export const fetchPinsFailed = (state, action) => {
    let userId = getUserId(action);
    return {
        ...state,
        [userId]: updateUser(state, userId, {fetchPinsFailed: action.payload})
    }
}

export const newPin = (state, action) => {
    let userId = action.payload.pin.owner;
    let pins = getPins(state, userId);
    pins.splice(0, 0, action.payload.pin);
    return {
        ...state,
        [userId]: updateUser(state, userId, {pins})
    }
}