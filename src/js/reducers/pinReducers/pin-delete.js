export const deletePin = (state, action) => {
    let pinId = action.meta.passedData.pinId;
    let pins = state.pins.slice(0);
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
        pins,
        lastPinId
    };
};

export const deletePinSuccess = (state, action) => {
    return {
        ...state,
        deletePinMessage: action.payload
    };
};

export const deletePinPending = (state, action) => {
    return {
        ...state,
        deletePinPending: action.payload
    };
};

export const deletePinFailed = (state, action) => {
    return {
        ...state,
        deletePinFailed: action.payload
    };
};