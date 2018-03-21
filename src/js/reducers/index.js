import { combineReducers } from "redux";
import { userReducer } from "./userReducers";
import { pinReducer } from "./pinReducers";
import { usersReducer } from "./usersReducers";
import { snackbarReducer } from "./snackbarReducers";

const reducers = combineReducers({
    user: userReducer,
    pin: pinReducer,
    users: usersReducer,
    snackbar: snackbarReducer
});

export default reducers;