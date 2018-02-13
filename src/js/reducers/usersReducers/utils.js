export const getUserId = (action) => {
    return action.meta.passedData.userId;
}

export const getPins = (state, userId) => {
    if(!state[userId])
        return [];

    if(!state[userId].pins)
        return [];

    return state[userId].pins.slice(0);
}

export const updateUser = (state, userId, data) => {
    return {
        ...state[userId],
        ...data
    }
}