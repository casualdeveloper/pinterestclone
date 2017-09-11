import { USERS_FETCH_PINS ,SUCCESS, FAILED } from "../../constants/action-types";
import { createThunkPromiseAction } from "../../utils/createThunkAction";
import { WebAPI } from "../../utils/WebAPI";

//data can be provided as object { lastPinId: "..", userId: "required.." };
export const fetchUserPins = createThunkPromiseAction(USERS_FETCH_PINS, WebAPI.fetchUserPins);