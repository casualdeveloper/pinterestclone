import { defaultState } from "./index";

export const userLogin = (state, action) => {
    if(!action.payload || !action.payload.token || !action.payload.user)
        return {...state};
        
    return {
        ...defaultState,
        ...state,
        JWT: action.payload.token,
        ...action.payload.user,
        isAuth: true
    };
};

export const userLogout = () => {
    return {
        isAuth: false
    };
};

export const userLoginPending = (state, action) => {
    return {
        ...state,
        loginPending: action.payload
    };
};

export const userLoginError = (state, action) => {
    return {
        ...state,
        loginError: action.payload
    };
};

export const userSignupPending = (state, action) => {
    return {
        ...state,
        signupPending: action.payload
    };
};

export const userSignupError = (state, action) => {
    return {
        ...state,
        signupError: action.payload
    };
};