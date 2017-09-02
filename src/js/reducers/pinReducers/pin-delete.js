export const deletePin = (state, action) => {
    return {
        ...state
    }
}

export const deletePinSuccess = (state, action) => {
    return {
        ...state,
        deletePinMessage: action.payload
    }
}

export const deletePinPending = (state, action) => {
    return {
        ...state,
        deletePinPending: action.payload
    }
}

export const deletePinFailed = (state, action) => {
    return {
        ...state,
        deletePinFailed: action.payload
    }
}