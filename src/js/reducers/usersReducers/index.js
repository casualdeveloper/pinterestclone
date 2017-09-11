import { USERS_FETCH_PINS, FAILED, SUCCESS, PENDING } from "../../constants/action-types";

import * as fetchPins from "./users-fetch-pins";

const defaultState = {};

export function usersReducer (state = defaultState, action) {
    switch(action.type){
        case USERS_FETCH_PINS: return ( fetchPins.fetchPins(state, action) );
        case USERS_FETCH_PINS+PENDING: return ( fetchPins.fetchPinsPending(state, action) );
        case USERS_FETCH_PINS+FAILED:  return ( fetchPins.fetchPinsFailed(state, action) );

        default: return state
    }
}