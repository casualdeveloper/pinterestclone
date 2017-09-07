import { PIN_NEW, PIN_DELETE, PINS_FETCH, SUCCESS, FAILED } from "../../constants/action-types";
import { createThunkPromiseAction } from "../../utils/createThunkAction";
import { createAction } from "redux-actions";
import { WebAPI } from "../../utils/WebAPI";

//data provided should be object { url: "..", description: ".." };
export const newPin = createThunkPromiseAction(PIN_NEW, WebAPI.newPin);

//data provided should be object { pinId: ".." };
export const deletePin = createThunkPromiseAction(PIN_DELETE, WebAPI.deletePin);

//data can be provided as object { lastPinId: ".." };
export const fetchPins = createThunkPromiseAction(PINS_FETCH, WebAPI.fetchPins);

export const newPinError= createAction(PIN_NEW+FAILED);
export const newPinMessage = createAction(PIN_NEW+SUCCESS);

export const deletePinError = createAction(PIN_DELETE+FAILED);
export const deletePinSuccess = createAction(PIN_DELETE+SUCCESS);

