import { PIN_DELETE, PIN_NEW, PINS_FETCH, SUCCESS, PENDING, FAILED, PIN_LIKE, PIN_UNLIKE } from "../../constants/action-types";

import * as newPin from "./pin-new";
import * as deletePin from "./pin-delete";
import * as fetchPins from "./pins-fetch";
import * as likePin from "./pin-like";
import * as unlikePin from "./pin-unlike";

const defaultState = {
    pins: [],
};

export function pinReducer (state = defaultState, action) {
    switch(action.type){
        case PIN_NEW:         return ( newPin.newPin(state, action ) );
        case PIN_NEW+SUCCESS: return ( newPin.newPinSuccess(state, action) );
        case PIN_NEW+PENDING: return ( newPin.newPinPending(state, action) );
        case PIN_NEW+FAILED:  return ( newPin.newPinFailed(state, action) );

        case PIN_DELETE:         return ( deletePin.deletePin(state, action ) );
        case PIN_DELETE+SUCCESS: return ( deletePin.deletePinSuccess(state, action) );
        case PIN_DELETE+PENDING: return ( deletePin.deletePinPending(state, action) );
        case PIN_DELETE+FAILED:  return ( deletePin.deletePinFailed(state, action) );

        case PINS_FETCH:         return ( fetchPins.fetchPins(state, action) );
        case PINS_FETCH+PENDING: return ( fetchPins.fetchPinsPending(state, action) );
        case PINS_FETCH+FAILED:  return ( fetchPins.fetchPinsFailed(state, action) );

        case PIN_LIKE:   return ( likePin.likePin(state, action) );
        case PIN_UNLIKE: return ( unlikePin.unlikePin(state, action) );

        default: return state;
    }
}