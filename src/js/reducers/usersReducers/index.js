import { USERS_FETCH_PINS,PIN_NEW, PIN_DELETE, FAILED, SUCCESS, PENDING } from "../../constants/action-types";

import * as pins from "./users-pins";

const defaultState = {};

export function usersReducer (state = defaultState, action) {
    switch(action.type){
        case USERS_FETCH_PINS: return ( pins.fetchPins(state, action) );
        case USERS_FETCH_PINS+PENDING: return ( pins.fetchPinsPending(state, action) );
        case USERS_FETCH_PINS+FAILED: return ( pins.fetchPinsFailed(state, action) );

        case PIN_NEW: return ( pins.newPin(state, action) );
        case PIN_DELETE: return ( pins.deletePin(state, action) );
        default: return state
    }
}