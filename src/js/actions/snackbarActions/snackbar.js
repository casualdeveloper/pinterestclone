import { SNACKBAR_ADD_MESSAGE, SNACKBAR_REMOVE_MESSAGE } from "../../constants/action-types";

import { createAction } from "redux-actions";

export const newSnackbarMessage = createAction(SNACKBAR_ADD_MESSAGE);
export const deleteSnackbarMessage = createAction(SNACKBAR_REMOVE_MESSAGE);