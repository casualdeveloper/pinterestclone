import { USER_LOGIN, USER_SIGNUP, USER_LOGOUT, SUCCESS, FAILED, PENDING } from "../../constants/action-types";
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

//pass reference to window that will redirect user to twitter page
//**we cannot open window here
//**because window needs to be opened as immediate response to button click
//**to avoid any pop up blockers
const userLoginPending = createAction(USER_LOGIN+PENDING);
const userLoginError = createAction(USER_LOGIN+FAILED);
const userLoginSuccess = createAction(USER_LOGIN);
const getErrorFromResponse = (error) => {
    let message = "Something went wrong, please try again later.";

    if(error.response && error.response.data && error.response.data.error){
        message = error.response.data.error;
    }

    return message;
}

export const twitterLogin = (windowRef) => {
    return dispatch => {
        dispatch(userLoginPending(true));

        WebAPI.getTwitterRequestToken()
        .then(response => {
            let twitterAuthUrl = response.data.twitter_auth_url;
            windowRef.location.href = twitterAuthUrl;

            getUserAuthorizationFromTwitter(windowRef, (twitterCallbackQuery) => { requestTwitterAuth(dispatch, twitterCallbackQuery) } )
        })
        .catch(error => {
            disaptch(userLoginError(getErrorFromResponse(error)));
            dispatch(userLoginPending(false));
        });
    }
}

const getUserAuthorizationFromTwitter = (windowRef, cb) => {
    let twitterCallbackQuery;
    let interval = setInterval(() => {
        if(windowRef.closed){
            twitterCallbackQuery = windowRef.twitterCallbackQuery;
            clearInterval(interval);
            return cb(twitterCallbackQuery);
        }
    },50);
}

const requestTwitterAuth = (dispatch, twitterCallbackQuery) => {
    WebAPI.loginTwitter(twitterCallbackQuery)
    .then(response => {
        dispatch(userLoginSuccess(response.data));
        _saveJWT(response);
        dispatch(userLoginPending(false));
    })
    .catch(error => {
        dispatch(userLoginError(getErrorFromResponse(error)));
        dispatch(userLoginPending(false));
    });
}