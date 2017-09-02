import { combineReducers } from "redux";
import { userReducer } from "./userReducers";
import { pinReducer } from "./pinReducers";

const reducers = combineReducers({
    user: userReducer,
    pin: pinReducer
});

export default reducers;