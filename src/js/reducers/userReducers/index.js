import { USER_LOGIN, USER_SIGNUP, PENDING, FAILED, USER_LOGOUT } from "../../constants/action-types";

import * as auth from "./user-auth";

import { getLocalJWT } from "../../utils/localData";

const defaultState = { 
    isAuth: false,
    JWT: getLocalJWT()
};

export function userReducer (state = defaultState, action) {
    switch(action.type){
        case USER_LOGIN: return ( auth.userLogin(state, action) );
        case USER_LOGIN+PENDING: return ( auth.userLoginPending(state, action) );
        case USER_LOGIN+FAILED:  return ( auth.userLoginError(state, action) );

        case USER_LOGOUT: return ( auth.userLogout(state, action) );

        case USER_SIGNUP: return ( auth.userLogin(state, action) ); // since successfull acount creation ends up returning same info as signing in we finnish it off with same reducer
        case USER_SIGNUP+PENDING: return ( auth.userSignupPending(state, action) );
        case USER_SIGNUP+FAILED:  return ( auth.userSignupError(state, action) );

        default: return state;
    }
}