import { SUCCESS, FAILED, PENDING } from "../constants/action-types";
import { createAction } from "redux-actions";

//successCallback, errorCallback optional callback funcitons that returns axios default responses
export const createThunkPromiseAction = (type, promise, successCallback, errorCallback) => {
    let TYPE_PENDING = type + PENDING,
        TYPE_SUCCESS = type + SUCCESS,
        TYPE_FAILED  = type + FAILED;
    
    //separate payload and meta
    const payloadFunction = (data) => {
        return data.payload;
    }
    const metaFunction = (data) => {
        return data.meta;
    }

    const typeAction  = createAction(type, payloadFunction, metaFunction);
    const typePending = createAction(TYPE_PENDING, payloadFunction, metaFunction);
    const typeSuccess = createAction(TYPE_SUCCESS, payloadFunction, metaFunction);
    const typeFailed  = createAction(TYPE_FAILED, payloadFunction, metaFunction);

    let passedData;
    //wrapper to setup data object to be passed to action while dispatching
    const dispatchActionDataWrapper = (payload, metadata = {}) => {
        return {
            payload,
            meta: { 
                ...metadata,
                passedData
                
            }
        }
    }
    
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
                if(data && data.message)
                    dispatch(typeSuccess(dispatchActionDataWrapper(data.message)));

                //call sucess callback if there is one
                if(successCallback && typeof(successCallback === "function"))
                    successCallback(response);
            })
            .catch(error => {
                //dispatch typePending while false value indicating that loading is finished
                dispatch(typePending(dispatchActionDataWrapper(false)));

                //default message
                let message = "Something went wrong, please try again later.";

                if(error.response && error.response.data && error.response.data.error){
                    message = error.response.data.error;
                }

                //dispatch error message
                dispatch(typeFailed(dispatchActionDataWrapper(message)));

                //call error callback if there is one
                if(errorCallback && typeof(errorCallback) === "function")
                    errorCallback(error);
            });
        }
    }
}