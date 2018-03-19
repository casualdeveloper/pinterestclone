import { SNACKBAR_ADD_MESSAGE, SNACKBAR_REMOVE_MESSAGE } from "../../constants/action-types";

import { addMessage } from "./addMessage";
import { removeMessage } from "./removeMessage";

const defaultState = {
    messageStack: []
};

export function snackbarReducer (state = defaultState, action) {
    switch(action.type){
        case SNACKBAR_ADD_MESSAGE: return ( addMessage(state, action) );
        case SNACKBAR_REMOVE_MESSAGE: return ( removeMessage(state, action) );

        default: return state;
    }
}