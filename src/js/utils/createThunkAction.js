import { SUCCESS, FAILED, PENDING } from "../constants/action-types";
import { createAction } from "redux-actions";

//successCallback, errorCallback optional callback funcitons that returns axios default responses
export const createThunkPromiseAction = (type, promise, successCallback, errorCallback) => {
    let TYPE_PENDING = type + PENDING,
        TYPE_SUCCESS = type + SUCCESS,
        TYPE_FAILED  = type + FAILED;

    const typeAction  = createAction(type);
    const typePending = createAction(TYPE_PENDING);
    const typeSuccess = createAction(TYPE_SUCCESS, data => data);
    const typeFailed  = createAction(TYPE_FAILED, data => data);
    
    return (data) => {
        return dispatch => {
            dispatch(typePending(true));
            //dispatch failed and success actions
            //to delete currently active messages
            dispatch(typeSuccess(null));
            dispatch(typeFailed(null));
            
            promise(data)
            .then(response => {
                let data = response.data;
                dispatch(typePending(false));
                dispatch(typeAction(data));

                //dispatch success messages if there are any
                if(data && data.message)
                    dispatch(typeSuccess(data.message));

                if(successCallback && typeof(successCallback === "function"))
                    successCallback(response)
            })
            .catch(error => {
                dispatch(typePending(false));
                let message = "Something went wrong, please try again later.";;
                if(error.response && error.response.data && error.response.data.error){
                    message = error.response.data.error;
                }
                dispatch(typeFailed(message));

                if(errorCallback && typeof(errorCallback) === "function")
                    successCallback(error);
            });
        }
    }
}