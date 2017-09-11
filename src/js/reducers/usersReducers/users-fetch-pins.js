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
    //get users pins, if there are none or if user is only now being added function will return empty array
    let oldPins = getPins(state, userId);
    let pins = oldPins.concat(action.payload.pins);
    //get last pins id
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