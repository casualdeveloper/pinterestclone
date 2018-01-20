export const newPin = (state, action) => {
    let pins = state.pins.slice(0);
    let pin = action.payload.pin;
    pins.splice(0, 0, pin);
    let lastPinId = state.lastPinId || pin._id;
    return {
        ...state,
        pins,
        lastPinId
    }
}

export const newPinSuccess = (state, action) => {
    return {
        ...state,
        newPinSuccessMessage: action.payload
    }
}

export const newPinPending = (state, action) => {
    return {
        ...state,
        newPinPending: action.payload
    }
}

export const newPinFailed = (state, action) => {
    return {
        ...state,
        newPinFailed: action.payload
    }
}