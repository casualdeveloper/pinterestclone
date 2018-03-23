import { USER_FETCH_LIKED_PINS } from "../../constants/action-types";
import { createThunkPromiseAction } from "../../utils/createThunkAction";
import { WebAPI } from "../../utils/WebAPI";


//data can be provided as object { lastPinId: "STRING..", amountOfPins: "INT" };
export const fetchLikedPins = createThunkPromiseAction(USER_FETCH_LIKED_PINS, WebAPI.fetchUserLikedPins);