import { USERS_FETCH_PINS,PIN_NEW, FAILED, SUCCESS, PENDING } from "../../constants/action-types";

import * as pins from "./users-pins";

const defaultState = {};

export function usersReducer (state = defaultState, action) {
    switch(action.type){
        case USERS_FETCH_PINS: return ( pins.fetchPins(state, action) );
        case USERS_FETCH_PINS+PENDING: return ( pins.fetchPinsPending(state, action) );
        case USERS_FETCH_PINS+FAILED: return ( pins.fetchPinsFailed(state, action) );

        case PIN_NEW: return ( pins.newPin(state, action) );
        default: return state
    }
}