import { combineReducers } from "redux";
import { userReducer } from "./userReducers";
import { pinReducer } from "./pinReducers";
import { usersReducer } from "./usersReducers";

const reducers = combineReducers({
    user: userReducer,
    pin: pinReducer,
    users: usersReducer
});

export default reducers;