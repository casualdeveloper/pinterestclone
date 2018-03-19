import { SUCCESS, FAILED, PENDING, SNACKBAR_ADD_MESSAGE } from "../constants/action-types";
import { createAction } from "redux-actions";

//successCallback, errorCallback optional callback funcitons that returns axios default responses
export const createThunkPromiseAction = (type, promise, successCallback, errorCallback) => {
    let TYPE_PENDING = type + PENDING,
        TYPE_SUCCESS = type + SUCCESS,
        TYPE_FAILED  = type + FAILED;
    
    //separate payload and meta
    const payloadFunction = (data) => {
        return data.payload;
    };

    const metaFunction = (data) => {
        return data.meta;
    };

    const typeAction     = createAction(type, payloadFunction, metaFunction);
    const typePending    = createAction(TYPE_PENDING, payloadFunction, metaFunction);
    const typeSuccess    = createAction(TYPE_SUCCESS, payloadFunction, metaFunction);
    const typeFailed     = createAction(TYPE_FAILED, payloadFunction, metaFunction);
    const generalMessage = createAction(SNACKBAR_ADD_MESSAGE);

    let passedData;
    //wrapper to setup data object to be passed to action while dispatching
    const dispatchActionDataWrapper = (payload, metadata = {}) => {
        return {
            payload,
            meta: { 
                ...metadata,
                passedData
            }
        };
    };
    
    return (data) => {
        return dispatch => {
            //we keep data that was passed as argument
            //to attach later to the meta of action
            passedData = data;

            dispatch(typePending(dispatchActionDataWrapper(true)));

            //dispatch failed and success actions
            //to delete currently active messages
            dispatch(typeSuccess(dispatchActionDataWrapper(null)));
            dispatch(typeFailed(dispatchActionDataWrapper(null)));

            promise(data)
            .then(response => {
                let payload = response.data;

                //dispatch typePending with false value to indicate that loading is finished
                dispatch(typePending(dispatchActionDataWrapper(false)));

                //dispatch data retrieved
                dispatch(typeAction(dispatchActionDataWrapper(payload)));

                //dispatch success messages if there are any
                if(payload && payload.message)
                    dispatch(typeSuccess(dispatchActionDataWrapper(payload.message)));

                //dispatch snackbar messages if there are any
                if(payload && payload.generalMessage)
                    dispatch(generalMessage(payload.generalMessage));

                //call sucess callback if there is one
                if(successCallback && typeof(successCallback === "function"))
                    successCallback(response);
            })
            .catch(error => {
                //dispatch typePending while false value indicating that loading is finished
                dispatch(typePending(dispatchActionDataWrapper(false)));

                //default message
                let message = "Couldn't complete action, please try again later";
                let errorMessage;

                if(error.response && error.response.data){
                    if(error.response.data.message || error.response.data.generalMessage)
                        message = error.response.data.message || error.response.data.generalMessage;
                    if(error.response.data.error)
                        errorMessage = error.response.data.error;
                }

                //dispatch snackbar messages if there are any
                 dispatch(generalMessage(message));

                //dispatch error message
                dispatch(typeFailed(dispatchActionDataWrapper(errorMessage)));

                //call error callback if there is one
                if(errorCallback && typeof(errorCallback) === "function")
                    errorCallback(error);
            });
        };
    };
};