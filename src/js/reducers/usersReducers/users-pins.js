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
    let lastPinId = pins[pins.length - 1]._id;
    return {
        ...state,
        [userId]: updateUser(state, userId, {pins, lastPinId})
    }
}

export const fetchPinsPending = (state, action) => {
    let userId = getUserId(action);
    return {
        ...state,
        [userId]: updateUser(state, userId, { fetchPinsPending: action.payload })
    }
}

export const fetchPinsFailed = (state, action) => {
    let userId = getUserId(action);
    return {
        ...state,
        [userId]: updateUser(state, userId, { fetchPinsFailed: action.payload })
    }
}

export const newPin = (state, action) => {
    let pin = action.payload.pin;
    let userId = pin.owner;
    let pins = getPins(state, userId);
    pins.splice(0, 0, pin);
    let lastPinId = pins[pins.length - 1]._id;
    return {
        ...state,
        [userId]: updateUser(state, userId, { pins, lastPinId })
    }
}

export const deletePin = (state, action) => {
    let pinId = action.meta.passedData.pinId;
    let ownerId = action.meta.passedData.owner;
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
    }
}