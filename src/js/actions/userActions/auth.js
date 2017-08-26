import { USER_LOGIN, USER_SIGNUP, USER_LOGOUT } from "../../constants/action-types";
import { createThunkPromiseAction } from "../../utils/createThunkAction";
import { createAction } from "redux-actions";
import { WebAPI, setAxiosAuthHeader } from "../../utils/WebAPI";
import { saveJWTLocally, removeJWTFromLocalStorage } from "../../utils/localData"; 

const _saveJWT = (response) => {
    if(response && response.data && response.data.token){
        saveJWTLocally(response.data.token);
        setAxiosAuthHeader(response.data.token);
    }
}

const _userLogoutAction = createAction(USER_LOGOUT);

// data provided should be object { username: "..", password: ".." }
export const userLogin = createThunkPromiseAction(USER_LOGIN, WebAPI.login, _saveJWT);

// data provided should be string AUTH_TOKEN 
export const userJWTLogin = createThunkPromiseAction(USER_LOGIN, WebAPI.JWTLogin);

// data provided should be object { username: "..", password: "..", email: ".." }
export const userSignup = createThunkPromiseAction(USER_SIGNUP, WebAPI.signup, _saveJWT);

export const userLogout = () => {
    return dispatch => {
        dispatch(_userLogoutAction());
        removeJWTFromLocalStorage();
    }
}