import { USERS_FETCH_PINS } from "../../constants/action-types";
import { createThunkPromiseAction } from "../../utils/createThunkAction";
import { WebAPI } from "../../utils/WebAPI";

//data can be provided as object { lastPinId: "..", userId: "required..", amountOfPins: "INT.." };
export const fetchUserPins = createThunkPromiseAction(USERS_FETCH_PINS, WebAPI.fetchUserPins);