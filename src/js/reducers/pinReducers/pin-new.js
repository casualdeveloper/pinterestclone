export const newPin = (state, action) => {
    let pins = state.pins.slice(0);
    pins.splice(0,0,action.payload.pin);
    return {
        ...state,
        pins
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