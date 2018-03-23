import { USER_LOGIN, USER_SIGNUP, PENDING, FAILED, USER_LOGOUT, PIN_LIKE, PIN_UNLIKE, USER_FETCH_LIKED_PINS } from "../../constants/action-types";

import * as auth from "./user-auth";
import * as userLikePin from "./user-like-pin";
import * as userUnlikePin from "./user-unlike-pin";
import * as fetchLikedPins from "./user-fetch-liked-pins";

import { getLocalJWT } from "../../utils/localData";

const defaultState = { 
    isAuth: false,
    JWT: getLocalJWT(),
    pinnedData: {
        pins: [],
        lastPinIndex: 0
    }
};

export function userReducer (state = defaultState, action) {
    switch(action.type){
        case USER_LOGIN:         return ( auth.userLogin(state, action) );
        case USER_LOGIN+PENDING: return ( auth.userLoginPending(state, action) );
        case USER_LOGIN+FAILED:  return ( auth.userLoginError(state, action) );

        case USER_LOGOUT: return ( auth.userLogout(state, action) );

        // since successfull acount creation ends up returning same info as signing in we finnish it off with same reducer
        case USER_SIGNUP:         return ( auth.userLogin(state, action) ); 
        case USER_SIGNUP+PENDING: return ( auth.userSignupPending(state, action) );
        case USER_SIGNUP+FAILED:  return ( auth.userSignupError(state, action) );

        case PIN_LIKE:   return ( userLikePin.userLikePin(state, action ) );
        case PIN_UNLIKE: return ( userUnlikePin.userUnlikePin(state, action ) );

        case USER_FETCH_LIKED_PINS: return ( fetchLikedPins.fetchLikedPins(state, action) );
        case USER_FETCH_LIKED_PINS+PENDING: return ( fetchLikedPins.fetchLikedPinsPending(state, action) );
        default: return state;
    }
}